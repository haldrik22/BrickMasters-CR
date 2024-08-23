from flask import Flask, jsonify, request, send_from_directory, session, redirect, url_for, send_file
import cx_Oracle
import io
import os
from werkzeug.utils import secure_filename
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from flask_cors import CORS
from contextlib import contextmanager
from werkzeug.security import generate_password_hash, check_password_hash
from flask import make_response

# Inicialización de la aplicación Flask
app = Flask(__name__, static_folder='Interfaz Gráfica/scripts')
CORS(app, supports_credentials=True, origins="http://127.0.0.1:5501")

@app.route('/<path:path>')
def send_file(path):
    return send_from_directory(app.static_folder, path)

app.secret_key = 'BRICK2024LENG'

app.config['SESSION_COOKIE_PATH'] = '/'

# Configuración de Cabeceras de Respuesta para CORS
@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5501'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

# Manejo de Métodos OPTIONS para CORS
@app.route('/<path:path>', methods=['OPTIONS'])
def options(path):
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response

@contextmanager
def get_db_connection():
    conn = None
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
        yield conn
    except Exception as err:
        print(f"Error creating connection: {err}")
    finally:
        if conn:
            conn.close()

#Hash Password
def hash_password(password):
    return generate_password_hash(password)

def check_password(hashed_password, password):
    return check_password_hash(hashed_password, password)

#Subida de Imágenes para los Productos
app.config['UPLOAD_FOLDER'] = 'C:/Users/taraz/Desktop/Fidélitas/V Cuatrimestre/Lenguajes de Base de Datos {SC-504}/BrickMasters-CR/Interfaz Gráfica/scripts/img/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#---------------------------------------REGISTRO & LOGIN----------------------------------------
#---------------------------------------ADMIN LOGIN----------------------------------------
# Ruta de Registro de Administradores
@app.route('/api/administradores/register', methods=['POST'])
def register_admin():
    try:
        data = request.json
        nom_administradores = data['nom_administradores']
        ape_administradores = data['ape_administradores']
        correo_administradores = data['correo_administradores']
        tel_administradores = data['tel_administradores']
        direccion_administradores = data['direccion_administradores']
        password = hash_password(data['password'])  # Hash the password

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_ADMINISTRADORES_CREATE_SP", [
                nom_administradores, ape_administradores, correo_administradores, tel_administradores, direccion_administradores, password
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error registering admin: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar la información de la cuenta del administrador
@app.route('/api/administradores/account', methods=['PUT'])
def update_admin_account():
    try:
        admin_id = session.get('admin_id')
        if not admin_id:
            return jsonify({'status': 'error', 'message': 'No admin ID found'}), 401

        data = request.json
        nom_administradores = data['nom_administradores']
        ape_administradores = data['ape_administradores']
        correo_administradores = data['correo_administradores']
        tel_administradores = data['tel_administradores']
        direccion_administradores = data['direccion_administradores']
        password = data.get('password', None)

        with get_db_connection() as conn:
            cursor = conn.cursor()
            if password:
                hashed_password = hash_password(password)
                cursor.execute("""
                    UPDATE FIDE_ADMINISTRADORES_TB
                    SET V_NOM_ADMINISTRADORES = :nom_administradores, V_APE_ADMINISTRADORES = :ape_administradores,
                        V_CORREO_ADMINISTRADORES = :correo_administradores, V_TEL_ADMINISTRADORES = :tel_administradores,
                        V_DIRECCION_ADMINISTRADORES = :direccion_administradores, V_PASSWORD = :hashed_password
                    WHERE FIDE_ADMINISTRADORES_V_Id_administradores_PK = :admin_id
                """, [nom_administradores, ape_administradores, correo_administradores, tel_administradores, direccion_administradores, hashed_password, admin_id])
            else:
                cursor.execute("""
                    UPDATE FIDE_ADMINISTRADORES_TB
                    SET V_NOM_ADMINISTRADORES = :nom_administradores, V_APE_ADMINISTRADORES = :ape_administradores,
                        V_CORREO_ADMINISTRADORES = :correo_administradores, V_TEL_ADMINISTRADORES = :tel_administradores,
                        V_DIRECCION_ADMINISTRADORES = :direccion_administradores
                    WHERE FIDE_ADMINISTRADORES_V_Id_administradores_PK = :admin_id
                """, [nom_administradores, ape_administradores, correo_administradores, tel_administradores, direccion_administradores, admin_id])

            conn.commit()
            cursor.close()

        return jsonify({'status': 'success', 'message': 'Información actualizada exitosamente'}), 200

    except Exception as e:
        print(f"Error updating admin account: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta Datos de Sesión de Administradores
@app.route('/api/admin_session', methods=['GET'])
def get_admin_session_data():
    try:
        admin_id = session.get('admin_id')
        if not admin_id:
            return jsonify({'error': 'No admin ID in session'}), 401
        return jsonify({'admin_id': admin_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta de Login de Administradores
@app.route('/api/administradores/login', methods=['POST'])
def login_admin():
    try:
        data = request.json
        correo_administradores = data['correo_administradores']
        password = data['password']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT FIDE_ADMINISTRADORES_V_Id_administradores_PK, V_PASSWORD FROM FIDE_ADMINISTRADORES_TB 
                WHERE V_CORREO_ADMINISTRADORES = :correo_administradores AND V_ESTADO = 'Activo'
            """, [correo_administradores])
            row = cursor.fetchone()
            cursor.close()

        if row and check_password(row[1], password):
            session['admin_id'] = row[0]
            return jsonify({'status': 'success', 'message': 'Login successful'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401
    except Exception as e:
        print(f"Error logging in admin: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener la información de la cuenta del administrador
@app.route('/api/administradores/account', methods=['GET'])
def get_admin_account():
    try:
        admin_id = session.get('admin_id')
        if not admin_id:
            return jsonify({'status': 'error', 'message': 'No admin ID found'}), 401

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT V_NOM_ADMINISTRADORES, V_APE_ADMINISTRADORES, V_CORREO_ADMINISTRADORES, V_TEL_ADMINISTRADORES, V_DIRECCION_ADMINISTRADORES
                FROM FIDE_ADMINISTRADORES_TB
                WHERE FIDE_ADMINISTRADORES_V_Id_administradores_PK = :admin_id
            """, [admin_id])
            row = cursor.fetchone()
            cursor.close()

        if row:
            result = {
                'nom_administradores': row[0],
                'ape_administradores': row[1],
                'correo_administradores': row[2],
                'tel_administradores': row[3],
                'direccion_administradores': row[4],
            }
            return jsonify(result), 200
        else:
            return jsonify({'status': 'error', 'message': 'Administrador no encontrado'}), 404

    except Exception as e:
        print(f"Error fetching admin account: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta de Logout de Administradores
@app.route('/api/administradores/logout', methods=['POST'])
def logout_admin():
    session.pop('admin_id', None)
    return jsonify({'status': 'success', 'message': 'Logout successful'}), 200

#Ruta de Registro
@app.route('/api/clientes/register', methods=['POST'])
def register_client():
    try:
        data = request.json
        nom_cliente = data['nom_cliente']
        ape_cliente = data['ape_cliente']
        correo_cliente = data['correo_cliente']
        tel_cliente = data['tel_cliente']
        direccion_cliente = data['direccion_cliente']
        password = hash_password(data['password'])  # Hash the password

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CLIENTES_CREATE_SP", [
                nom_cliente, ape_cliente, correo_cliente, tel_cliente, direccion_cliente, password
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error registering client: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

#Ruta de Login
@app.route('/api/clientes/login', methods=['POST'])
def login_client():
    try:
        data = request.json
        correo_cliente = data['correo_cliente']
        password = data['password']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT FIDE_CLIENTES_V_Id_cliente_PK, V_PASSWORD FROM FIDE_CLIENTES_TB 
                WHERE V_CORREO_CLIENTE = :correo_cliente AND V_ESTADO = 'Activo'
            """, [correo_cliente])
            row = cursor.fetchone()
            cursor.close()

        if row and check_password(row[1], password):
            session['client_id'] = row[0]
            print(f"Logged in: client_id={session['client_id']}")  # Add this for debugging
            return jsonify({'status': 'success', 'message': 'Login successful'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401
    except Exception as e:
        print(f"Error logging in client: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener la información de la cuenta del cliente
@app.route('/api/clientes/account', methods=['GET'])
def get_client_account():
    try:
        print(f"Session content: {session}")  # Add this to log the session content
        client_id = session.get('client_id')
        if not client_id:
            return jsonify({'status': 'error', 'message': 'No client ID found'}), 401

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT V_NOM_CLIENTE, V_APE_CLIENTE, V_CORREO_CLIENTE, V_TEL_CLIENTE, V_DIRECCION_CLIENTE
                FROM FIDE_CLIENTES_TB
                WHERE FIDE_CLIENTES_V_Id_cliente_PK = :client_id
            """, [client_id])
            row = cursor.fetchone()
            cursor.close()

        if row:
            result = {
                'nom_cliente': row[0],
                'ape_cliente': row[1],
                'correo_cliente': row[2],
                'tel_cliente': row[3],
                'direccion_cliente': row[4],
            }
            return jsonify(result), 200
        else:
            return jsonify({'status': 'error', 'message': 'Client not found'}), 404

    except Exception as e:
        print(f"Error fetching client account: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar la información de la cuenta del cliente
@app.route('/api/clientes/account', methods=['PUT'])
def update_client_account():
    try:
        client_id = session.get('client_id')
        if not client_id:
            return jsonify({'status': 'error', 'message': 'No client ID found'}), 401

        data = request.json
        nom_cliente = data['nom_cliente']
        ape_cliente = data['ape_cliente']
        correo_cliente = data['correo_cliente']
        tel_cliente = data['tel_cliente']
        direccion_cliente = data['direccion_cliente']
        password = data.get('password', None)

        with get_db_connection() as conn:
            cursor = conn.cursor()
            if password:
                hashed_password = hash_password(password)
                cursor.execute("""
                    UPDATE FIDE_CLIENTES_TB
                    SET V_NOM_CLIENTE = :nom_cliente, V_APE_CLIENTE = :ape_cliente,
                        V_CORREO_CLIENTE = :correo_cliente, V_TEL_CLIENTE = :tel_cliente,
                        V_DIRECCION_CLIENTE = :direccion_cliente, V_PASSWORD = :hashed_password
                    WHERE FIDE_CLIENTES_V_Id_cliente_PK = :client_id
                """, [nom_cliente, ape_cliente, correo_cliente, tel_cliente, direccion_cliente, hashed_password, client_id])
            else:
                cursor.execute("""
                    UPDATE FIDE_CLIENTES_TB
                    SET V_NOM_CLIENTE = :nom_cliente, V_APE_CLIENTE = :ape_cliente,
                        V_CORREO_CLIENTE = :correo_cliente, V_TEL_CLIENTE = :tel_cliente,
                        V_DIRECCION_CLIENTE = :direccion_cliente
                    WHERE FIDE_CLIENTES_V_Id_cliente_PK = :client_id
                """, [nom_cliente, ape_cliente, correo_cliente, tel_cliente, direccion_cliente, client_id])

            conn.commit()
            cursor.close()

        return jsonify({'status': 'success', 'message': 'Información actualizada exitosamente'}), 200

    except Exception as e:
        print(f"Error updating client account: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

#Ruta Logout
@app.route('/api/clientes/logout', methods=['POST'])
def logout_client():
    session.pop('client_id', None)
    return jsonify({'status': 'success', 'message': 'Logout successful'}), 200

#Ruta Datos de Sesión
@app.route('/api/session', methods=['GET'])
def get_session_data():
    try:
        client_id = session.get('client_id')
        if not client_id:
            return jsonify({'error': 'No client ID in session'}), 401
        return jsonify({'client_id': client_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#--------------------------------------------TABLAS---------------------------------------------
# TABLA ADMINISTRADORES
# Función para obtener datos de administradores, trae la tabla completa de la base de datos.
def fetch_administradores():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_ADMINISTRADORES_V_Id_administradores_PK,
                    V_Nom_administradores,
                    V_Ape_administradores,
                    V_Correo_administradores,
                    V_Tel_administradores,
                    V_Direccion_administradores,
                    V_Estado
                FROM FIDE_ADMINISTRADORES_TB
                WHERE V_Estado != 'INACTIVO'
            """)
            rows = cur.fetchall()
            cur.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

# ENRUTADORES ADMINISTRADORES --------------------------------------------
# Ruta para obtener todos los administradores
@app.route('/api/administradores', methods=['GET'])
def get_administradores():
    data = fetch_administradores()
    result = []
    for row in data:
        if row[6] != 'INACTIVO':  # Skip inactive administrators
            result.append({
                'FIDE_ADMINISTRADORES_V_Id_administradores_PK': row[0],
                'V_Nom_administradores': row[1],
                'V_Ape_administradores': row[2],
                'V_Correo_administradores': row[3],
                'V_Tel_administradores': row[4],
                'V_Direccion_administradores': row[5],
                'V_Estado': row[6]
            })
    return jsonify(result)

# Ruta para obtener un administrador por su ID
@app.route('/api/administradores/<int:id_administrador>', methods=['GET'])
def get_administrador(id_administrador):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_ADMINISTRADORES_V_Id_administradores_PK,
                    V_Nom_administradores,
                    V_Ape_administradores,
                    V_Correo_administradores,
                    V_Tel_administradores,
                    V_Direccion_administradores
                FROM FIDE_ADMINISTRADORES_TB
                WHERE FIDE_ADMINISTRADORES_V_Id_administradores_PK = :1
            """, [id_administrador])
            row = cur.fetchone()
            cur.close()
        
        if row:
            result = {
                'FIDE_ADMINISTRADORES_V_Id_administradores_PK': row[0],
                'V_Nom_administradores': row[1],
                'V_Ape_administradores': row[2],
                'V_Correo_administradores': row[3],
                'V_Tel_administradores': row[4],
                'V_Direccion_administradores': row[5]
            }
            return jsonify(result), 200
        else:
            return jsonify({'status': 'error', 'message': 'Administrador no encontrado'}), 404

    except Exception as e:
        print(f"Error fetching administrador: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para crear un nuevo administrador
@app.route('/api/administradores', methods=['POST'])
def create_administrador():
    try:
        data = request.json
        nom_administradores = data['nom_administradores']
        ape_administradores = data['ape_administradores']
        correo_administradores = data['correo_administradores']
        tel_administradores = data['tel_administradores']
        direccion_administradores = data['direccion_administradores']
        password = data['password']  

        hashed_password = hash_password(password) 

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_ADMINISTRADORES_CREATE_SP", [
                nom_administradores, ape_administradores, correo_administradores, tel_administradores, direccion_administradores, hashed_password
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating administrador: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un administrador por su ID
@app.route('/api/administradores/<int:id_administrador>', methods=['PUT'])
def update_administrador(id_administrador):
    try:
        data = request.json
        print("Received data:", data)
        nom_administradores = data['nom_administradores']
        ape_administradores = data['ape_administradores']
        correo_administradores = data['correo_administradores']
        tel_administradores = data['tel_administradores']
        direccion_administradores = data['direccion_administradores']
        password = data.get('password', None) 

        # If no new password is provided, retain the existing one
        if not password:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT V_Password FROM FIDE_ADMINISTRADORES_TB
                    WHERE FIDE_ADMINISTRADORES_V_Id_administradores_PK = :1
                """, [id_administrador])
                password = cursor.fetchone()[0]  # Get the existing password
                cursor.close()

        hashed_password = hash_password(password) if password else None

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_ADMINISTRADORES_UPDATE_SP", [
                id_administrador, nom_administradores, ape_administradores, correo_administradores, tel_administradores, direccion_administradores, hashed_password
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating administrador: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Ruta para eliminar un administrador por su ID
@app.route('/api/administradores/<int:id_administrador>', methods=['DELETE'])
def delete_administrador(id_administrador):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_ADMINISTRADORES_DELETE_SP", [id_administrador])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
# TABLA CATÁLOGO
# Función para obtener datos del catálogo, trae solo las columnas necesarias para la visualización.
def fetch_catalogo():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_CATALOGO_V_Id_producto_PK,
                    V_Nom_producto,
                    V_Precio_producto,
                    V_Descripcion_producto,
                    V_Cantidad_producto,
                    V_Image_Path  -- Moved to align with the selected data for simplicity
                FROM FIDE_CATALOGO_TB
                WHERE V_ESTADO != 'INACTIVO'
            """)
            rows = cur.fetchall()
            cur.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

# ENRUTADORES CATÁLOGO --------------------------------------------
# Ruta para obtener todos los productos del catálogo
@app.route('/api/catalogo', methods=['GET'])
def get_catalogo():
    data = fetch_catalogo()
    result = []
    for row in data:
        result.append({
            'FIDE_CATALOGO_V_Id_producto_PK': row[0],
            'V_Nom_producto': row[1],
            'V_Precio_producto': row[2],
            'V_Descripcion_producto': row[3],
            'V_Cantidad_producto': row[4],
            'V_Image_Path': row[5]  
        })
    return jsonify(result)

# Ruta para obtener los detalles de un producto del catálogo por su ID (para la vista de consumidor)
@app.route('/api/catalogo/detalles/<int:id_producto>', methods=['GET'])
def get_catalogo_detalles(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_CATALOGO_READ_SP", [id_producto, result])
            cursor_result = result.getvalue()
            
            if cursor_result is None:
                return jsonify({'status': 'error', 'message': 'Producto no encontrado'}), 404
            
            rows = cursor_result.fetchall()
            columns = [col[0] for col in cursor_result.description]
            rows_dict = [dict(zip(columns, row)) for row in rows]

            cursor.close()
        
        # Return the data as an array
        return jsonify([rows_dict[0]]), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        return jsonify({'status': 'error', 'message': 'Database error occurred.'}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un producto del catálogo por su ID
@app.route('/api/catalogo/<int:id_producto>', methods=['GET'])
def read_catalogo(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_CATALOGO_READ_SP", [id_producto, result])
            cursor_result = result.getvalue()
            
            if cursor_result is None:
                return jsonify({'status': 'error', 'message': 'Producto no encontrado'}), 404
            
            rows = cursor_result.fetchall()
            columns = [col[0] for col in cursor_result.description]
            rows_dict = [dict(zip(columns, row)) for row in rows]

            cursor.close()
        
        return jsonify(rows_dict[0]), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        return jsonify({'status': 'error', 'message': 'Database error occurred.'}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Ruta para crear un nuevo producto en el catálogo
@app.route('/api/catalogo', methods=['POST'])
def create_catalogo():
    try:
        data = request.json
        id_producto = data['id_catalogo_producto']
        nom_producto = data['nom_catalogo_producto']
        precio_producto = data['precio_catalogo_producto']
        descripcion_producto = data['descripcion_catalogo_producto']
        cantidad_producto = data['cantidad_catalogo_producto']
        creado_por = data['creado_por_catalogo']
        fecha_creacion = data['fecha_creacion_catalogo']
        accion = "CREATE"
        estado = "Activo"
        imagen_path = data['imagen_catalogo_producto'] 

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CATALOGO_CREATE_SP", [
                id_producto, nom_producto, precio_producto, descripcion_producto, cantidad_producto, 
                creado_por, fecha_creacion, accion, estado, imagen_path 
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating catalog: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un producto del catálogo por su ID
@app.route('/api/catalogo/<int:id_catalogo_producto>', methods=['PUT'])
def update_catalogo(id_catalogo_producto):
    try:
        data = request.json
        
        # Extract the image path from the request
        imagen_path = data['imagen_catalogo_producto']
        
        # Update only the image path in the Catalogo table
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE FIDE_CATALOGO_TB
                SET V_Image_Path = :1,
                    V_Modificado_por = 'Admin',  -- Static value for the user who modifies
                    V_Fecha_de_modificacion = SYSDATE,
                    V_Accion = 'UPDATE'
                WHERE FIDE_CATALOGO_V_Id_producto_PK = :2
            """, [imagen_path, id_catalogo_producto])
            conn.commit()
            cursor.close()

        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating catalog: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un producto del catálogo por su ID
@app.route('/api/catalogo/<int:id_producto>', methods=['DELETE'])
def delete_catalogo(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            # Update status to INACTIVO in Catalogo table only
            cursor.execute("""
                UPDATE FIDE_CATALOGO_TB
                SET V_ESTADO = 'INACTIVO'
                WHERE FIDE_CATALOGO_V_Id_producto_PK = :1
            """, [id_producto])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

#Ruta para reactivar un producto en el catálogo
@app.route('/api/productos/reactivate/<int:id_producto>', methods=['PUT'])
def reactivate_producto(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            # Reactivate product in Productos table
            cursor.execute("""
                UPDATE FIDE_PRODUCTOS_TB
                SET V_ESTADO = 'Activo'
                WHERE FIDE_PRODUCTOS_V_ID_PRODUCTO_PK = :1
            """, [id_producto])

            # Reactivate product in Catalogo table if it exists there
            cursor.execute("""
                UPDATE FIDE_CATALOGO_TB
                SET V_ESTADO = 'Activo'
                WHERE FIDE_CATALOGO_V_Id_producto_PK = :1
            """, [id_producto])

            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para reactivar un producto en el catálogo
@app.route('/api/catalogo/reactivate/<int:id_producto>', methods=['PUT'])
def reactivate_catalogo(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE FIDE_CATALOGO_TB
                SET V_ESTADO = 'Activo',
                    V_Modificado_por = 'Admin',  -- Static value for the user who modifies
                    V_Fecha_de_modificacion = SYSDATE,
                    V_Accion = 'REACTIVATE'
                WHERE FIDE_CATALOGO_V_Id_producto_PK = :1
            """, [id_producto])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# --------------------------------------------
# Nuevo API Para info carrito
# --------------------------------------------
@app.route('/api/cart-product/<int:id_producto>', methods=['GET'])
def get_cart_product(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT
                    c.FIDE_CATALOGO_V_Id_producto_PK,
                    c.V_Nom_producto,
                    c.V_Precio_producto,
                    c.V_Descripcion_producto,
                    c.V_Cantidad_producto,
                    c.V_Image_Path,
                    prov.V_Nom_provedor
                FROM FIDE_CATALOGO_TB c
                LEFT JOIN FIDE_PROVEEDORES_PRODUCTO_TB pp
                ON c.FIDE_CATALOGO_V_Id_producto_PK = pp.FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK
                LEFT JOIN FIDE_PROVEEDORES_TB prov
                ON pp.FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK = prov.FIDE_PROVEEDORES_V_Id_proveedor_PK
                WHERE c.FIDE_CATALOGO_V_Id_producto_PK = :id_producto
            """, {'id_producto': id_producto})
            
            row = cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]
                product = dict(zip(columns, row))
                return jsonify([product]), 200
            else:
                return jsonify([]), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# TABLA LOCALES
# Función para obtener datos de locales, trae la tabla completa de la base de datos.
def fetch_locales():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_LOCALES_V_Id_local_PK,
                    V_Nom_local,
                    V_Tel_local,
                    V_Direccion_local,
                    V_Estado
                FROM FIDE_LOCALES_TB
                WHERE V_Estado != 'INACTIVO'
            """)
            rows = cur.fetchall()
            cur.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

# ENRUTADORES LOCALES --------------------------------------------
# Ruta para obtener todos los locales
@app.route('/api/locales', methods=['GET'])
def get_locales():
    data = fetch_locales()
    result = []
    for row in data:
        if row[4] != 'INACTIVO':  # Skip inactive locales
            result.append({
                'FIDE_LOCALES_V_Id_local_PK': row[0],
                'V_Nom_local': row[1],
                'V_Tel_local': row[2],
                'V_Direccion_local': row[3],
                'V_Estado':  row[4]
            })
    return jsonify(result)

# Ruta para obtener un local por su ID
@app.route('/api/locales/<int:id_local>', methods=['GET'])
def get_local(id_local):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_LOCALES_V_Id_local_PK,
                    V_Nom_local,
                    V_Tel_local,
                    V_Direccion_local
                FROM FIDE_LOCALES_TB
                WHERE FIDE_LOCALES_V_Id_local_PK = :1
            """, [id_local])
            row = cur.fetchone()
            cur.close()
        
        if row:
            result = {
                'FIDE_LOCALES_V_Id_local_PK': row[0],
                'V_Nom_local': row[1],
                'V_Tel_local': row[2],
                'V_Direccion_local': row[3]
            }
            return jsonify(result), 200
        else:
            return jsonify({'status': 'error', 'message': 'Local no encontrado'}), 404

    except Exception as e:
        print(f"Error fetching local: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para crear un nuevo local
@app.route('/api/locales', methods=['POST'])
def create_local():
    try:
        data = request.json
        nom_local = data['nom_local']
        tel_local = data['tel_local']
        direccion_local = data['direccion_local']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_LOCALES_CREATE_SP", [
                nom_local, tel_local, direccion_local
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating local: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un local por su ID
@app.route('/api/locales/<int:id_local>', methods=['PUT'])
def update_local(id_local):
    try:
        data = request.json
        nom_local = data['nom_local']
        tel_local = data['tel_local']
        direccion_local = data['direccion_local']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_LOCALES_UPDATE_SP", [
                id_local, nom_local, tel_local, direccion_local
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating local: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un local por su ID (marca como INACTIVO)
@app.route('/api/locales/<int:id_local>', methods=['DELETE'])
def delete_local(id_local):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_LOCALES_DELETE_SP", [id_local])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# TABLA CLIENTES
# Función para obtener datos de clientes, trae la tabla completa de la base de datos.
def fetch_clientes():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_CLIENTES_V_Id_cliente_PK,
                    V_Nom_cliente,
                    V_Ape_cliente,
                    V_Correo_cliente,
                    V_Tel_cliente,
                    V_Direccion_cliente,
                    V_CREADO_POR
                    V_MODIFICADO_POR,
                    V_FECHA_DE_CREACION,
                    V_FECHA_DE_MODIFICACION,
                    V_ACCION,
                    V_ESTADO,
                    V_PASSWORD
                FROM FIDE_CLIENTES_TB
                WHERE V_Estado != 'INACTIVO'
            """)
            rows = cur.fetchall()
            cur.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

# ENRUTADORES CLIENTES --------------------------------------------
# Ruta para obtener todos los clientes
@app.route('/api/clientes', methods=['GET'])
def get_clientes():
    data = fetch_clientes()
    result = []
    for row in data:
        if row[11] != 'INACTIVO':  # Skip inactive clients
            result.append({
                'FIDE_CLIENTES_V_Id_cliente_PK': row[0],
                'V_Nom_cliente': row[1],
                'V_Ape_cliente': row[2],
                'V_Correo_cliente': row[3],
                'V_Tel_cliente': row[4],
                'V_Direccion_cliente': row[5],
                'V_Estado':  row[11]
            })
    return jsonify(result)

# Ruta para obtener un cliente por su ID
@app.route('/api/clientes/<int:id_cliente>', methods=['GET'])
def get_cliente(id_cliente):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_CLIENTES_V_Id_cliente_PK,
                    V_Nom_cliente,
                    V_Ape_cliente,
                    V_Correo_cliente,
                    V_Tel_cliente,
                    V_Direccion_cliente
                FROM FIDE_CLIENTES_TB
                WHERE FIDE_CLIENTES_V_Id_cliente_PK = :1
            """, [id_cliente])
            row = cur.fetchone()
            cur.close()
        
        if row:
            result = {
                'FIDE_CLIENTES_V_Id_cliente_PK': row[0],
                'V_Nom_cliente': row[1],
                'V_Ape_cliente': row[2],
                'V_Correo_cliente': row[3],
                'V_Tel_cliente': row[4],
                'V_Direccion_cliente': row[5]
            }
            return jsonify(result), 200
        else:
            return jsonify({'status': 'error', 'message': 'Cliente no encontrado'}), 404

    except Exception as e:
        print(f"Error fetching cliente: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para crear un nuevo cliente
@app.route('/api/clientes', methods=['POST'])
def create_cliente():
    try:
        data = request.json
        nom_cliente = data['nom_cliente']
        ape_cliente = data['ape_cliente']
        correo_cliente = data['correo_cliente']
        tel_cliente = data['tel_cliente']
        direccion_cliente = data['direccion_cliente']
        password = data['password']  

        hashed_password = hash_password(password) 

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CLIENTES_CREATE_SP", [
                nom_cliente, ape_cliente, correo_cliente, tel_cliente, direccion_cliente, hashed_password
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating cliente: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un cliente por su ID
@app.route('/api/clientes/<int:id_cliente>', methods=['PUT'])
def update_cliente(id_cliente):
    try:
        data = request.json
        print("Received data:", data)
        nom_cliente = data['nom_cliente']
        ape_cliente = data['ape_cliente']
        correo_cliente = data['correo_cliente']
        tel_cliente = data['tel_cliente']
        direccion_cliente = data['direccion_cliente']
        password = data.get('password', None) 

        # If no new password is provided, retain the existing one
        if not password:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT V_Password FROM FIDE_CLIENTES_TB
                    WHERE FIDE_CLIENTES_V_Id_cliente_PK = :1
                """, [id_cliente])
                password = cursor.fetchone()[0]  # Get the existing password
                cursor.close()

        hashed_password = hash_password(password) if password else None

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CLIENTES_UPDATE_SP", [
                id_cliente, nom_cliente, ape_cliente, correo_cliente, tel_cliente, direccion_cliente, hashed_password
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating cliente: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Ruta para eliminar un cliente por su ID
@app.route('/api/clientes/<int:id_cliente>', methods=['DELETE'])
def delete_cliente(id_cliente):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CLIENTES_DELETE_SP", [id_cliente])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# TABLA PRODUCTOS
# Función para obtener datos de productos, trae la tabla completa de la base de datos.
def fetch_productos():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_PRODUCTOS_V_ID_PRODUCTO_PK,
                    V_NOM_PRODUCTO,
                    V_PIEZAS_PRODUCTO,
                    V_PRECIO_PRODUCTO,
                    V_CANTIDAD_PRODUCTO,
                    V_DESCRIPCION_PRODUCTO,
                    V_ESTADO
                FROM FIDE_PRODUCTOS_TB
                WHERE V_ESTADO != 'INACTIVO'
            """)
            rows = cur.fetchall()
            cur.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

# ENRUTADORES PRODUCTOS --------------------------------------------
# Ruta para obtener todos los productos
@app.route('/api/productos', methods=['GET'])
def get_productos():
    data = fetch_productos()
    result = []
    for row in data:
        if row[6] != 'INACTIVO':  # Skip inactive products
            result.append({
                'FIDE_PRODUCTOS_V_ID_PRODUCTO_PK': row[0],
                'V_NOM_PRODUCTO': row[1],
                'V_PIEZAS_PRODUCTO': row[2],
                'V_PRECIO_PRODUCTO': row[3],
                'V_CANTIDAD_PRODUCTO': row[4],
                'V_DESCRIPCION_PRODUCTO': row[5],
                'V_ESTADO': row[6]
            })
    return jsonify(result)

# Ruta para obtener un producto por su ID
@app.route('/api/productos/<int:id_producto>', methods=['GET'])
def get_producto(id_producto):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_PRODUCTOS_V_ID_PRODUCTO_PK,
                    V_NOM_PRODUCTO,
                    V_PIEZAS_PRODUCTO,
                    V_PRECIO_PRODUCTO,
                    V_CANTIDAD_PRODUCTO,
                    V_DESCRIPCION_PRODUCTO
                FROM FIDE_PRODUCTOS_TB
                WHERE FIDE_PRODUCTOS_V_ID_PRODUCTO_PK = :1
            """, [id_producto])
            row = cur.fetchone()
            cur.close()
        
        if row:
            result = {
                'FIDE_PRODUCTOS_V_ID_PRODUCTO_PK': row[0],
                'V_NOM_PRODUCTO': row[1],
                'V_PIEZAS_PRODUCTO': row[2],
                'V_PRECIO_PRODUCTO': row[3],
                'V_CANTIDAD_PRODUCTO': row[4],
                'V_DESCRIPCION_PRODUCTO': row[5]
            }
            return jsonify(result), 200
        else:
            return jsonify({'status': 'error', 'message': 'Producto no encontrado'}), 404

    except Exception as e:
        print(f"Error fetching producto: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para crear un nuevo producto y opcionalmente vincularlo a un proveedor
# Existing create_producto function
@app.route('/api/productos', methods=['POST'])
def create_producto():
    try:
        data = request.json
        nom_producto = data['nom_producto']
        piezas_producto = data['piezas_producto']
        precio_producto = data['precio_producto']
        cantidad_producto = data['cantidad_producto']
        descripcion_producto = data['descripcion_producto']
        id_proveedor = data.get('id_proveedor')  # Optional field

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PRODUCTOS_CREATE_SP", [
                nom_producto, piezas_producto, precio_producto, cantidad_producto, descripcion_producto
            ])
            
            # Retrieve the newly created product ID
            cursor.execute("SELECT FIDE_PRODUCTOS_ID_SEQ.CURRVAL FROM dual")
            new_producto_id = cursor.fetchone()[0]

            # If a provider ID is provided, create a Proveedores_Producto entry
            if id_proveedor:
                cursor.callproc("FIDE_PROVEEDORES_PRODUCTO_CREATE_SP", [
                    id_proveedor, new_producto_id
                ])

            conn.commit()
            cursor.close()
        return jsonify({'status': 'success', 'id_producto': new_producto_id}), 201
    except Exception as e:
        print(f"Error creating producto: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un producto por su ID
@app.route('/api/productos/<int:id_producto>', methods=['PUT'])
def update_producto(id_producto):
    try:
        data = request.json
        nom_producto = data['nom_producto']
        piezas_producto = data['piezas_producto']
        precio_producto = data['precio_producto']
        cantidad_producto = data['cantidad_producto']
        descripcion_producto = data['descripcion_producto']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PRODUCTOS_UPDATE_SP", [
                id_producto, nom_producto, piezas_producto, precio_producto, cantidad_producto, descripcion_producto
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating producto: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un producto por su ID
@app.route('/api/productos/<int:id_producto>', methods=['DELETE'])
def delete_producto(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PRODUCTOS_DELETE_SP", [id_producto])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para agregar un producto al catálogo  
@app.route('/api/catalogo/agregar', methods=['POST'])
def agregar_a_catalogo():
    try:
        data = request.json
        id_producto = data['id_producto']
        image_path = data['image_path']

        with get_db_connection() as conn:
            cursor = conn.cursor()

            # Check if the product is already in the catalog
            cursor.execute("""
                SELECT COUNT(*)
                FROM FIDE_CATALOGO_TB
                WHERE FIDE_CATALOGO_V_Id_producto_PK = :1
            """, [id_producto])
            exists = cursor.fetchone()[0]

            if exists > 0:
                return jsonify({'status': 'error', 'message': 'Producto ya existe en el catálogo'}), 409

            # Fetch product details from the Productos table
            cursor.execute("""
                SELECT V_NOM_PRODUCTO, V_PRECIO_PRODUCTO, V_DESCRIPCION_PRODUCTO, V_CANTIDAD_PRODUCTO 
                FROM FIDE_PRODUCTOS_TB 
                WHERE FIDE_PRODUCTOS_V_ID_PRODUCTO_PK = :1
            """, [id_producto])
            producto = cursor.fetchone()

            if producto:
                # Call the Catalogo Create Procedure
                cursor.callproc("FIDE_CATALOGO_CREATE_SP", [
                    id_producto,
                    producto[0],  # V_NOM_PRODUCTO
                    producto[1],  # V_PRECIO_PRODUCTO
                    producto[2],  # V_DESCRIPCION_PRODUCTO
                    producto[3],  # V_CANTIDAD_PRODUCTO
                    image_path    # V_IMAGE_PATH
                ])

                conn.commit()
                return jsonify({'status': 'success', 'message': 'Producto agregado a Catálogo exitosamente'}), 201
            else:
                return jsonify({'status': 'error', 'message': 'Producto no encontrado'}), 404

    except Exception as e:
        print(f"Error adding product to Catalogo: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

#Ruta para subir imágenes al folder img/
@app.route('/api/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        relative_path = os.path.join('img', filename) 
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)  
        file.save(save_path)
        return jsonify({'imagePath': relative_path}), 200 
    else:
        return jsonify({'error': 'File type not allowed'}), 400


# TABLA PROVEEDORES
# Función para obtener datos de proveedores, trae la tabla completa de la base de datos.
def fetch_proveedores():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_PROVEEDORES_V_Id_proveedor_PK,
                    V_Nom_provedor,
                    V_Correo_proveedor,
                    V_Producto_proveedor,
                    V_Tel_proveedor,
                    V_Direccion_proveedor,
                    V_Estado
                FROM FIDE_PROVEEDORES_TB
                WHERE V_Estado != 'INACTIVO'
            """)
            rows = cur.fetchall()
            cur.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

# ENRUTADORES PROVEEDORES --------------------------------------------
# Ruta para obtener todos los proveedores
@app.route('/api/proveedores', methods=['GET'])
def get_proveedores():
    data = fetch_proveedores()
    result = []
    for row in data:
        if row[6] != 'INACTIVO':  # Skip inactive suppliers
            result.append({
                'FIDE_PROVEEDORES_V_Id_proveedor_PK': row[0],
                'V_Nom_provedor': row[1],
                'V_Correo_proveedor': row[2],
                'V_Producto_proveedor': row[3],
                'V_Tel_proveedor': row[4],
                'V_Direccion_proveedor': row[5],
                'V_Estado':  row[6]
            })
    return jsonify(result)

# Ruta para obtener un proveedor por su ID
@app.route('/api/proveedores/<int:id_proveedor>', methods=['GET'])
def get_proveedor(id_proveedor):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT
                    FIDE_PROVEEDORES_V_Id_proveedor_PK,
                    V_Nom_provedor,
                    V_Correo_proveedor,
                    V_Producto_proveedor,
                    V_Tel_proveedor,
                    V_Direccion_proveedor
                FROM FIDE_PROVEEDORES_TB
                WHERE FIDE_PROVEEDORES_V_Id_proveedor_PK = :1
            """, [id_proveedor])
            row = cur.fetchone()
            cur.close()
        
        if row:
            result = {
                'FIDE_PROVEEDORES_V_Id_proveedor_PK': row[0],
                'V_Nom_provedor': row[1],
                'V_Correo_proveedor': row[2],
                'V_Producto_proveedor': row[3],
                'V_Tel_proveedor': row[4],
                'V_Direccion_proveedor': row[5]
            }
            return jsonify(result), 200
        else:
            return jsonify({'status': 'error', 'message': 'Proveedor no encontrado'}), 404

    except Exception as e:
        print(f"Error fetching proveedor: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para crear un nuevo proveedor
@app.route('/api/proveedores', methods=['POST'])
def create_proveedor():
    try:
        data = request.json
        nom_provedor = data['nom_provedor']
        correo_proveedor = data['correo_proveedor']
        producto_proveedor = data['producto_proveedor']
        tel_proveedor = data['tel_proveedor']
        direccion_proveedor = data['direccion_proveedor']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_CREATE_SP", [
                nom_provedor, correo_proveedor, producto_proveedor, tel_proveedor, direccion_proveedor
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating proveedor: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un proveedor por su ID
@app.route('/api/proveedores/<int:id_proveedor>', methods=['PUT'])
def update_proveedor(id_proveedor):
    try:
        data = request.json
        nom_provedor = data['nom_provedor']
        correo_proveedor = data['correo_proveedor']
        producto_proveedor = data['producto_proveedor']
        tel_proveedor = data['tel_proveedor']
        direccion_proveedor = data['direccion_proveedor']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_UPDATE_SP", [
                id_proveedor, nom_provedor, correo_proveedor, producto_proveedor, tel_proveedor, direccion_proveedor
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating proveedor: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un proveedor por su ID
@app.route('/api/proveedores/<int:id_proveedor>', methods=['DELETE'])
def delete_proveedor(id_proveedor):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_DELETE_SP", [id_proveedor])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener todos los registros activos de FIDE_TIPO_DESCUENTO_TB
@app.route('/api/tipo_descuento', methods=['GET'])
def get_tipo_descuento():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM FIDE_TIPO_DESCUENTO_TB
                WHERE V_ESTADO != 'INACTIVO'
            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para crear un nuevo registro en FIDE_TIPO_DESCUENTO_TB
@app.route('/api/tipo_descuento', methods=['POST'])
def create_tipo_descuento():
    try:
        data = request.json
        # Use the correct key names matching the database
        FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK = int(data['FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK'])
        V_PORCENTAJE_DESCUENTO = float(data['V_PORCENTAJE_DESCUENTO'])

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_TIPO_DESCUENTO_CREATE_SP", [
                FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK, V_PORCENTAJE_DESCUENTO
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except ValueError as ve:
        return jsonify({'status': 'error', 'message': 'Invalid input type provided'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un registro de FIDE_TIPO_DESCUENTO_TB por su ID
@app.route('/api/tipo_descuento/<int:id_tipo_descuento>', methods=['GET'])
def read_tipo_descuento(id_tipo_descuento):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_TIPO_DESCUENTO_READ_SP", [id_tipo_descuento, result])
            cursor_result = result.getvalue()
            if cursor_result is None:
                return jsonify({'status': 'error', 'message': 'No data returned from stored procedure.'}), 404
            rows = cursor_result.fetchall()
            columns = [col[0] for col in cursor_result.description]
            rows_dict = [dict(zip(columns, row)) for row in rows]
            cursor.close()
        return jsonify(rows_dict), 200
    except cx_Oracle.DatabaseError as e:
        error, = e.args
        return jsonify({'status': 'error', 'message': error.message}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un registro de FIDE_TIPO_DESCUENTO_TB por su ID
@app.route('/api/tipo_descuento/<int:id_tipo_descuento>', methods=['PUT'])
def update_tipo_descuento(id_tipo_descuento):
    try:
        data = request.json
        FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK = int(data['FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK'])
        V_PORCENTAJE_DESCUENTO = float(data['V_PORCENTAJE_DESCUENTO'])


        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_TIPO_DESCUENTO_UPDATE_SP", [
                id_tipo_descuento, FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK, V_PORCENTAJE_DESCUENTO
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un registro de FIDE_TIPO_DESCUENTO_TB por su ID
@app.route('/api/tipo_descuento/<int:id_tipo_descuento>', methods=['DELETE'])
def delete_tipo_descuento(id_tipo_descuento):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_TIPO_DESCUENTO_DELETE_SP", [id_tipo_descuento])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener todos los registros de FIDE_DESCUENTOS_TB
@app.route('/api/descuentos', methods=['GET'])
def get_descuentos():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM FIDE_DESCUENTOS_TB WHERE V_ESTADO != 'INACTIVO'
            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para crear un nuevo registro en FIDE_DESCUENTOS_TB
@app.route('/api/descuentos', methods=['POST'])
def create_descuentos():
    try:
        data = request.json
        FIDE_DESCUENTOS_V_ID_CLIENTE_FK = int(data['FIDE_DESCUENTOS_V_ID_CLIENTE_FK'])
        FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK = int(data['FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK'])

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_DESCUENTOS_CREATE_SP", [
                FIDE_DESCUENTOS_V_ID_CLIENTE_FK, FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un registro de FIDE_DESCUENTOS_TB por su ID
@app.route('/api/descuentos/<int:id_descuento>', methods=['GET'])
def read_descuentos(id_descuento):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_DESCUENTOS_READ_SP", [id_descuento, result])
            cursor_result = result.getvalue()
            if cursor_result is None:
                return jsonify({'status': 'error', 'message': 'No data returned from stored procedure.'}), 404
            rows = cursor_result.fetchall()
            columns = [col[0] for col in cursor_result.description]
            rows_dict = [dict(zip(columns, row)) for row in rows]
            cursor.close()
        return jsonify(rows_dict), 200
    except cx_Oracle.DatabaseError as e:
        error, = e.args
        return jsonify({'status': 'error', 'message': error.message}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un registro de FIDE_DESCUENTOS_TB por su ID
@app.route('/api/descuentos/<int:id_descuento>', methods=['PUT'])
def update_descuentos(id_descuento):
    try:
        data = request.json
        FIDE_DESCUENTOS_V_ID_CLIENTE_FK = data['FIDE_DESCUENTOS_V_ID_CLIENTE_FK']
        FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK = data['FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_DESCUENTOS_UPDATE_SP", [
                id_descuento, FIDE_DESCUENTOS_V_ID_CLIENTE_FK, FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un registro de FIDE_DESCUENTOS_TB por su ID
@app.route('/api/descuentos/<int:id_descuento>', methods=['DELETE'])
def delete_descuentos(id_descuento):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_DESCUENTOS_DELETE_SP", [id_descuento])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener el descuento del cliente por su ID
@app.route('/api/cliente/<int:client_id>/descuento', methods=['GET'])
def get_cliente_descuento(client_id):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT
                    td.V_Porcentaje_descuento,
                    d.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK
                FROM
                    FIDE_DESCUENTOS_TB d
                JOIN FIDE_TIPO_DESCUENTO_TB td ON d.FIDE_DESCUENTOS_V_Id_tipo_descuento_FK = td.FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK
                WHERE
                    d.FIDE_DESCUENTOS_V_Id_cliente_FK = :client_id
                    AND d.V_Estado = 'Activo'
            """, {'client_id': client_id})
            
            discount = cursor.fetchone()
            cursor.close()

            if discount:
                return jsonify({'descuento': discount[0], 'id_descuento': discount[1]}), 200
            else:
                return jsonify({'descuento': 0, 'id_descuento': None}), 200  
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Ruta para obtener todos los registros de FIDE_PROVEEDORES_PRODUCTO_TB
@app.route('/api/proveedores_producto', methods=['GET'])
def get_proveedores_producto():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM FIDE_PROVEEDORES_PRODUCTO_TB
            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para crear un nuevo registro en FIDE_PROVEEDORES_PRODUCTO_TB
@app.route('/api/proveedores_producto', methods=['POST'])
def create_proveedores_producto():
    try:
        data = request.json
        id_proveedor = data['id_proveedor']
        id_producto = data['id_producto']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_PRODUCTO_CREATE_SP", [
                id_proveedor, id_producto
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating provider-product relationship: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un registro de FIDE_PROVEEDORES_PRODUCTO_TB por sus IDs
@app.route('/api/proveedores_producto/<int:id_proveedor>/<int:id_producto>', methods=['GET'])
def read_proveedores_producto(id_proveedor, id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_PROVEEDORES_PRODUCTO_READ_SP", [id_proveedor, id_producto, result])
            
            cursor_result = result.getvalue()
            
            if cursor_result is None:
                return jsonify({'status': 'error', 'message': 'No data returned from stored procedure.'}), 404
            
            rows = cursor_result.fetchall()
            columns = [col[0] for col in cursor_result.description]

            rows_dict = [dict(zip(columns, row)) for row in rows]

            cursor.close()
        
        return jsonify(rows_dict), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Database error: {error.message}")
        return jsonify({'status': 'error', 'message': 'Database error occurred.'}), 500
    except Exception as e:
        print(f"Error in read_proveedores_producto: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un registro de FIDE_PROVEEDORES_PRODUCTO_TB por sus IDs
@app.route('/api/proveedores_producto/<int:id_proveedor>/<int:id_producto>', methods=['PUT'])
def update_proveedores_producto(id_proveedor, id_producto):
    try:
        data = request.json

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_PRODUCTO_UPDATE_SP", [
                id_proveedor, id_producto
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating provider-product relationship: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un registro de FIDE_PROVEEDORES_PRODUCTO_TB por sus IDs
@app.route('/api/proveedores_producto/<int:id_proveedor>/<int:id_producto>', methods=['DELETE'])
def delete_proveedores_producto(id_proveedor, id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_PRODUCTO_DELETE_SP", [
                id_proveedor, id_producto
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

#Generar PDF de Factura
@app.route('/api/facturacion/invoice/<int:id_factura>', methods=['GET'])
def generate_invoice(id_factura):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT FIDE_FACTURACION_V_Id_factura_PK, V_Precio_total, V_Fecha_pago 
                FROM FIDE_FACTURACION_TB 
                WHERE FIDE_FACTURACION_V_Id_factura_PK = :id_factura
            """, [id_factura])
            factura = cursor.fetchone()
            cursor.close()

        if not factura:
            return jsonify({'status': 'error', 'message': 'Factura not found'}), 404

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)

        p.drawString(100, 750, f"Factura ID: {factura[0]}")
        p.drawString(100, 730, f"Total: ₡{factura[1]}")
        p.drawString(100, 710, f"Fecha de Pago: {factura[2]}")

        p.showPage()
        p.save()

        buffer.seek(0)
        return send_file(buffer, as_attachment=True, download_name=f"Factura_{id_factura}.pdf")

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
# Ruta para obtener todos los registros de FIDE_FACTURACION_TB
@app.route('/api/facturacion', methods=['GET'])
def get_facturacion():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM FIDE_FACTURACION_TB
                WHERE V_ESTADO != 'INACTIVO'
            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para crear un nuevo registro en FIDE_FACTURACION_TB
@app.route('/api/facturacion', methods=['POST'])
def create_facturacion():
    try:
        data = request.json
        app.logger.info(f"Received data: {data}")
        
        id_producto = data['id_producto']
        id_descuento = data['id_descuento']
        id_cliente = data['id_cliente']
        id_local = data['id_local']
        cantidad_producto = data['cantidad_producto']
        precio_subtotal = data['precio_subtotal']
        fecha_pago = data['fecha_pago']

        discount_response = get_cliente_descuento(id_cliente)
        discount_data = discount_response[0].json
        descuento = discount_data['descuento']

        precio_total = precio_subtotal * (1 - descuento / 100)

        app.logger.info(f"Processing facturacion with: {id_producto}, {id_descuento}, {id_cliente}, {id_local}, {cantidad_producto}, {precio_subtotal}, {precio_total}, {fecha_pago}")

        # Validate that all necessary fields are present
        if not all([id_producto, id_cliente, id_local, cantidad_producto, precio_subtotal, precio_total, fecha_pago]):
            raise ValueError("Missing required fields")

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_FACTURACION_CREATE_SP", [
                id_producto,
                id_descuento,
                id_cliente,
                id_local,
                cantidad_producto,
                precio_subtotal,
                precio_total,
                fecha_pago
            ])
            cursor.execute("SELECT FIDE_FACTURACION_ID_SEQ.CURRVAL FROM DUAL")
            factura_id = cursor.fetchone()[0]

            conn.commit()
            cursor.close()

        # Return the factura_id in the response
        return jsonify({'status': 'success', 'id_factura': factura_id}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
# Ruta para obtener un registro de FIDE_FACTURACION_TB por su ID
@app.route('/api/facturacion/<int:id_factura>', methods=['GET'])
def read_facturacion(id_factura):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_FACTURACION_READ_SP", [id_factura, result])
            cursor_result = result.getvalue()
            if cursor_result is None:
                return jsonify({'status': 'error', 'message': 'No data returned from stored procedure.'}), 404
            rows = cursor_result.fetchall()
            columns = [col[0] for col in cursor_result.description]
            rows_dict = [dict(zip(columns, row)) for row in rows]
            cursor.close()
        return jsonify(rows_dict), 200
    except cx_Oracle.DatabaseError as e:
        error, = e.args
        return jsonify({'status': 'error', 'message': error.message}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un registro de FIDE_FACTURACION_TB por su ID
@app.route('/api/facturacion/<int:id_factura>', methods=['PUT'])
def update_facturacion(id_factura):
    try:
        data = request.json
        id_producto = data['id_producto']
        id_descuento = data['id_descuento']
        id_cliente = data['id_cliente']
        id_local = data['id_local']
        cantidad_producto = data['cantidad_producto']
        precio_subtotal = data['precio_subtotal']
        precio_total = data['precio_total']
        fecha_pago = data['fecha_pago']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_FACTURACION_UPDATE_SP", [
                id_factura, id_producto, id_descuento, id_cliente, id_local,
                cantidad_producto, precio_subtotal, precio_total, fecha_pago
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un registro de FIDE_FACTURACION_TB por su ID
@app.route('/api/facturacion/<int:id_factura>', methods=['DELETE'])
def delete_facturacion(id_factura):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_FACTURACION_DELETE_SP", [id_factura])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

#Ruta para previsualizar la factura
@app.route('/api/facturacion/invoice/preview/<int:id_factura>', methods=['GET'])
def preview_invoice(id_factura):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT FIDE_FACTURACION_V_Id_factura_PK, V_Precio_total, V_Fecha_pago 
                FROM FIDE_FACTURACION_TB 
                WHERE FIDE_FACTURACION_V_Id_factura_PK = :id_factura
            """, [id_factura])
            factura = cursor.fetchone()
            cursor.close()

        if not factura:
            return jsonify({'status': 'error', 'message': 'Factura not found'}), 404

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)

        p.drawString(100, 750, f"Factura ID: {factura[0]}")
        p.drawString(100, 730, f"Total: ₡{factura[1]}")
        p.drawString(100, 710, f"Fecha de Pago: {factura[2]}")

        p.showPage()
        p.save()

        buffer.seek(0)

        response = make_response(buffer.getvalue())
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = f'inline; filename=Factura_{id_factura}.pdf'
        return response

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


#Leer entrega según factura
@app.route('/api/entrega/factura/<int:factura_id>', methods=['GET'])
def get_entrega_by_factura(factura_id):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT e.FIDE_ENTREGAS_V_ID_ENTREGA_PK
            FROM FIDE_ENTREGAS_TB e
            JOIN FIDE_FACTURACION_TB f ON e.FIDE_ENTREGAS_V_ID_CLIENTE_FK = f.FIDE_FACTURACION_V_ID_CLIENTE_FK
            WHERE f.FIDE_FACTURACION_V_ID_FACTURA_PK = :factura_id
            ORDER BY e.V_FECHA_DE_CREACION DESC
            FETCH FIRST 1 ROWS ONLY
            """, {'factura_id': factura_id})
            entrega = cursor.fetchone()
            cursor.close()

        if entrega:
            return jsonify({'id_entrega': entrega[0]}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Entrega not found'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener todos los registros de FIDE_VENTAS_TB
@app.route('/api/ventas', methods=['GET'])
def get_ventas():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM FIDE_VENTAS_TB
            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para crear un nuevo registro en FIDE_VENTAS_TB
@app.route('/api/ventas', methods=['POST'])
def create_ventas():
    try:
        data = request.json
        id_venta = data['id_venta']
        id_factura = data['id_factura']
        id_producto = data['id_producto']
        id_local = data['id_local']
        id_entrega = data['id_entrega']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion']
        accion = "CREATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_VENTAS_CREATE_SP", [
                id_venta, id_factura, id_producto, id_local, id_entrega, creado_por, fecha_creacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un registro de FIDE_VENTAS_TB por su ID
@app.route('/api/ventas/<int:id_venta>', methods=['GET'])
def read_ventas(id_venta):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_VENTAS_READ_SP", [id_venta, result])
            cursor_result = result.getvalue()
            if cursor_result is None:
                return jsonify({'status': 'error', 'message': 'No data returned from stored procedure.'}), 404
            rows = cursor_result.fetchall()
            columns = [col[0] for col in cursor_result.description]
            rows_dict = [dict(zip(columns, row)) for row in rows]
            cursor.close()
        return jsonify(rows_dict), 200
    except cx_Oracle.DatabaseError as e:
        error, = e.args
        return jsonify({'status': 'error', 'message': error.message}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un registro de FIDE_VENTAS_TB por su ID
@app.route('/api/ventas/<int:id_venta>', methods=['PUT'])
def update_ventas(id_venta):
    try:
        data = request.json
        id_factura = data['id_factura']
        id_producto = data['id_producto']
        id_local = data['id_local']
        id_entrega = data['id_entrega']
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion']
        accion = "UPDATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_VENTAS_UPDATE_SP", [
                id_venta, id_factura, id_producto, id_local, id_entrega, modificado_por, fecha_modificacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un registro de FIDE_VENTAS_TB por su ID
@app.route('/api/ventas/<int:id_venta>', methods=['DELETE'])
def delete_ventas(id_venta):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_VENTAS_DELETE_SP", [id_venta])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

#--------------------------------------------FUNCIONES--------------------------------------------
@app.route('/')
def index():
    return send_from_directory('funciones', 'htmlFunciones.html')

# Ruta para obtener el correo de un cliente por su ID
@app.route('/obtener_correo_cliente', methods=['POST'])
def obtener_correo_cliente():
    try:
        data = request.json
        id_cliente = data.get('id_cliente')
        
        if id_cliente is None:
            return jsonify({'correo': None, 'message': 'ID de cliente no proporcionado.'}), 400

        with get_db_connection() as conn:
            cursor = conn.cursor()
            correo_cliente = cursor.callfunc("FIDE_CLIENTES_OBTENER_CORREO_FN", cx_Oracle.STRING, [id_cliente])
            cursor.close()
        
        if correo_cliente:
            return jsonify({'correo': correo_cliente}), 200
        else:
            return jsonify({'correo': None, 'message': 'Cliente no encontrado.'}), 404

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Database error: {error.message}")
        return jsonify({'correo': None, 'message': 'Error en la base de datos.'}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'correo': None, 'message': str(e)}), 500

# Ruta Obtener Precio
@app.route('/obtener_precio_producto', methods=['POST'])
def api_obtener_precio_producto():
    data = request.json
    id_producto = data.get('id_producto')
    if id_producto is not None:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            try:
                precio = cursor.callfunc('FIDE_PRODUCTOS_OBTENER_PRECIO_FN', cx_Oracle.NUMBER, [id_producto])
                return jsonify({'precio': precio})
            except Exception as err:
                print('Error al obtener el precio del producto:', err)
                return jsonify({'error': 'Error al obtener el precio del producto'}), 500
            finally:
                cursor.close()
    else:
        return jsonify({'error': 'ID del producto no proporcionado'}), 400

#Ruta Calcular Monto Descuento
@app.route('/calcular_monto_descuento', methods=['POST'])
def api_calcular_monto_descuento():
    data = request.json
    id_descuento = data.get('id_descuento')
    subtotal = data.get('subtotal')
    if id_descuento is not None and subtotal is not None:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            try:
                monto_descuento = cursor.callfunc('FIDE_DESCUENTOS_CALCULAR_MONTO_FN', cx_Oracle.NUMBER, [id_descuento, subtotal])
                return jsonify({'monto_descuento': monto_descuento})
            except Exception as err:
                print('Error al calcular el monto del descuento:', err)
                return jsonify({'error': 'Error al calcular el monto del descuento'}), 500
            finally:
                cursor.close()
    else:
        return jsonify({'error': 'ID del descuento o subtotal no proporcionados'}), 400

#Ruta Disponibilidad de Producto
@app.route('/verificar_disponibilidad_producto', methods=['POST'])
def api_verificar_disponibilidad_producto():
    data = request.json
    id_producto = data.get('id_producto')
    if id_producto is not None:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            try:
                disponibilidad = cursor.callfunc('FIDE_PRODUCTOS_CHECK_DISPONIBILIDAD_FN', cx_Oracle.STRING, [id_producto])
                return jsonify({'disponibilidad': disponibilidad})
            except Exception as err:
                print('Error al verificar disponibilidad del producto:', err)
                return jsonify({'error': 'Error al verificar disponibilidad del producto'}), 500
            finally:
                cursor.close()
    else:
        return jsonify({'error': 'ID del producto no proporcionado'}), 400

#Ruta Contacto Proveedor
@app.route('/obtener_contacto_proveedor', methods=['POST'])
def api_obtener_contacto_proveedor():
    data = request.json
    id_proveedor = data.get('id_proveedor')
    if id_proveedor is not None:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            try:
                contacto = cursor.callfunc('FIDE_PROVEEDORES_OBTENER_CONTACTO_FN', cx_Oracle.STRING, [id_proveedor])
                return jsonify({'contacto': contacto})
            except Exception as err:
                print('Error al obtener información de contacto del proveedor:', err)
                return jsonify({'error': 'Error al obtener información de contacto del proveedor'}), 500
            finally:
                cursor.close()
    else:
        return jsonify({'error': 'ID del proveedor no proporcionado'}), 400

# Ruta Porcentaje Descuento Cliente
@app.route('/obtener_porcentaje_descuento', methods=['POST'])
def api_obtener_porcentaje_descuento():
    data = request.json
    id_cliente = data.get('id_cliente')
    if id_cliente is not None:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            try:
                porcentaje_descuento = cursor.callfunc('FIDE_CLIENTES_OBTENER_PORCENTAJE_DESCUENTO_FN', cx_Oracle.NUMBER, [id_cliente])
                return jsonify({'porcentaje_descuento': porcentaje_descuento})
            except Exception as err:
                print('Error al obtener porcentaje de descuento del cliente:', err)
                return jsonify({'error': 'Error al obtener porcentaje de descuento del cliente'}), 500
            finally:
                cursor.close()
    else:
        return jsonify({'error': 'ID de cliente no proporcionado'}), 400

#Ruta obtener total de Ordenes de Cliente
@app.route('/obtener_total_ordenes_cliente', methods=['POST'])
def api_obtener_total_ordenes_cliente():
    data = request.json
    id_cliente = data.get('id_cliente')
    if id_cliente is not None:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            try:
                total_ordenes = cursor.callfunc('FIDE_CLIENTES_OBTENER_TOTAL_ORDENES_FN', cx_Oracle.NUMBER, [id_cliente])
                return jsonify({'total_ordenes': total_ordenes})
            except Exception as err:
                print('Error al obtener total de órdenes del cliente:', err)
                return jsonify({'error': 'Error al obtener total de órdenes del cliente'}), 500
            finally:
                cursor.close()
    else:
        return jsonify({'error': 'ID de cliente no proporcionado'}), 400

#Ruta obtener total de Ventas de un Producto
@app.route('/obtener_total_ventas_producto', methods=['POST'])
def api_obtener_total_ventas_producto():
    data = request.json
    id_producto = data.get('id_producto')
    if id_producto is not None:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            try:
                total_ventas = cursor.callfunc('FIDE_VENTAS_OBTENER_TOTAL_VENTAS_FN', cx_Oracle.NUMBER, [id_producto])
                return jsonify({'total_ventas': total_ventas})
            except Exception as err:
                print('Error al obtener total de ventas del producto:', err)
                return jsonify({'error': 'Error al obtener total de ventas del producto'}), 500
            finally:
                cursor.close()
    else:
        return jsonify({'error': 'ID de producto no proporcionado'}), 400

# Ruta obtener inventario total
@app.route('/obtener_inventario', methods=['GET'])
def api_obtener_inventario():
    with get_db_connection() as conn:
        try:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_PRODUCTOS_OBTENER_INVENTARIO_FN', cx_Oracle.CURSOR)
            
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            
            result_cursor.close()
            cursor.close()

            return jsonify([dict(zip(column_names, row)) for row in rows])
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': str(e)}), 500

# Ruta para obtener las órdenes de facturación
@app.route('/obtener_ordenes_facturacion', methods=['GET'])
def obtener_ordenes_facturacion():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_FACTURACION_OBTENER_ORDENES_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener los proveedores
@app.route('/obtener_proveedores', methods=['GET'])
def obtener_proveedores():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_PROVEEDORES_OBTENER_PROVEEDORES_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener los descuentos
@app.route('/obtener_descuentos', methods=['GET'])
def obtener_descuentos():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_TIPO_DESCUENTO_OBTENER_DESCUENTOS_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener las tiendas.
@app.route('/obtener_tiendas', methods=['GET'])
def obtener_tiendas():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_LOCALES_OBTENER_TIENDAS_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener los productos del catálogo
@app.route('/obtener_productos_catalogo', methods=['GET'])
def obtener_productos_catalogo():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_CATALOGO_OBTENER_PRODUCTOS_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener los clientes
@app.route('/obtener_clientes', methods=['GET'])
def obtener_clientes():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_CLIENTES_OBTENER_CLIENTES_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener las órdenes y pagos
@app.route('/obtener_ordenes_pagos', methods=['GET'])
def obtener_ordenes_pagos():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_FACTURACION_OBTENER_ORDENES_PAGOS_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener las entregas de proveedores
@app.route('/obtener_entregas_proveedores', methods=['GET'])
def obtener_entregas_proveedores():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            result_cursor = cursor.callfunc('FIDE_PROVEEDORES_OBTENER_ENTREGAS_PROVEEDORES_FN', cx_Oracle.CURSOR)
            rows = result_cursor.fetchall()
            column_names = [desc[0] for desc in result_cursor.description]
            result_cursor.close()
            cursor.close()
            return jsonify([dict(zip(column_names, row)) for row in rows])
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500

#--------------------------------------------VISTAS--------------------------------------------

# Ruta para obtener datos de la vista FIDE_CLIENTES_DESCUENTOS_ENTREGAS_V
@app.route('/api/vista/clientes_descuentos_entregas', methods=['GET'])
def get_clientes_descuentos_entregas():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM FIDE_CLIENTES_DESCUENTOS_ENTREGAS_V")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener datos de la vista FIDE_PRODUCTOS_PROVEEDORES_V
@app.route('/api/vista/productos_proveedores', methods=['GET'])
def get_productos_proveedores():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM FIDE_PRODUCTOS_PROVEEDORES_V")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener datos de la vista FIDE_LOCALES_PRODUCTOS_V
@app.route('/api/vista/locales_productos', methods=['GET'])
def get_locales_productos():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM FIDE_LOCALES_PRODUCTOS_V")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener datos de la vista FIDE_TIPO_DESCUENTOS_CLIENTES_V
@app.route('/api/vista/tipo_descuentos_clientes', methods=['GET'])
def get_tipo_descuentos_clientes():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM FIDE_TIPO_DESCUENTOS_CLIENTES_V")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener datos de la vista FIDE_ENTREGAS_CLIENTES_CONTACTO_V
@app.route('/api/vista/entregas_clientes_contacto', methods=['GET'])
def get_entregas_clientes_contacto():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM FIDE_ENTREGAS_CLIENTES_CONTACTO_V")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
