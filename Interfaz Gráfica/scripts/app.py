from flask import Flask, jsonify, request, send_from_directory
import cx_Oracle
from flask_cors import CORS
from contextlib import contextmanager

# Inicialización de la aplicación Flask
app = Flask(__name__, static_folder='Interfaz Gráfica/scripts')
CORS(app, origins="http://127.0.0.1:5501")

@app.route('/<path:path>')
def send_file(path):
    return send_from_directory(app.static_folder, path)

# Configuración de Cabeceras de Respuesta para CORS
@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5501'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
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

#--------------------------------------------TABLAS---------------------------------------------
# TABLA CATÁLOGO
# Función para obtener datos del catálogo, trae la tabla completa de la base de datos.
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
                    V_Creado_por,
                    V_Modificado_por,
                    V_Fecha_de_creacion,
                    V_Fecha_de_modificacion,
                    V_Accion,
                    V_Estado
                FROM FIDE_CATALOGO_TB
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
            'V_Creado_por': row[5],
            'V_Modificado_por': row[6],
            'V_Fecha_de_creacion': row[7],
            'V_Fecha_de_modificacion': row[8],
            'V_Accion': row[9],
            'V_Estado': row[10]
        })
    return jsonify(result)

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

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CATALOGO_CREATE_SP", [
                id_producto, nom_producto, precio_producto, descripcion_producto, cantidad_producto, 
                creado_por, fecha_creacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating catalog: {e}")
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
        print(f"Error in read_catalogo: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un producto del catálogo por su ID
@app.route('/api/catalogo/<int:id_catalogo_producto>', methods=['PUT'])
def update_catalogo(id_catalogo_producto):
    try:
        data = request.json
        nom_producto = data['nom_catalogo_producto']
        precio_producto = data['precio_catalogo_producto']
        descripcion_producto = data['descripcion_catalogo_producto']
        cantidad_producto = data['cantidad_catalogo_producto']
        modificado_por = data['modificado_por_catalogo']
        fecha_modificacion = data['fecha_modificacion_catalogo'] 
        accion = "UPDATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CATALOGO_UPDATE_SP", [
                id_catalogo_producto, nom_producto, precio_producto, descripcion_producto, cantidad_producto,
                modificado_por, fecha_modificacion, accion, estado
            ])
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
            cursor.callproc("FIDE_CATALOGO_DELETE_SP", [id_producto])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# TABLA LOCALES
# Función para obtener datos de los locales, trae la tabla completa de la base de datos.
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
                    V_Creado_por,
                    V_Modificado_por,
                    V_Fecha_de_creacion,
                    V_Fecha_de_modificacion,
                    V_Accion,
                    V_Estado
                FROM FIDE_LOCALES_TB
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
        result.append({
            'FIDE_LOCALES_V_Id_local_PK': row[0],
            'V_Nom_local': row[1],
            'V_Tel_local': row[2],
            'V_Direccion_local': row[3],
            'V_Creado_por': row[4],
            'V_Modificado_por': row[5],
            'V_Fecha_de_creacion': row[6],
            'V_Fecha_de_modificacion': row[7],
            'V_Accion': row[8],
            'V_Estado': row[9]
        })
    return jsonify(result)

# Ruta para crear un nuevo local
@app.route('/api/locales', methods=['POST'])
def create_local():
    try:
        data = request.json
        id_local = data['id_local']
        nom_local = data['nom_local']
        tel_local = data['tel_local']
        direccion_local = data['direccion_local']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion']
        accion = "CREATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_LOCALES_CREATE_SP", [
                id_local, nom_local, tel_local, direccion_local, creado_por, fecha_creacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating local: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un local por su ID
@app.route('/api/locales/<int:id_local>', methods=['GET'])
def read_local(id_local):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_LOCALES_READ_SP", [id_local, result])
            
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
        print(f"Error in read_local: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un local por su ID
@app.route('/api/locales/<int:id_local>', methods=['PUT'])
def update_local(id_local):
    try:
        data = request.json
        nom_local = data['nom_local']
        tel_local = data['tel_local']
        direccion_local = data['direccion_local']
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion']
        accion = "UPDATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_LOCALES_UPDATE_SP", [
                id_local, nom_local, tel_local, direccion_local, modificado_por, fecha_modificacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating local: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para eliminar un local por su ID
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
                    V_Creado_por,
                    V_Modificado_por,
                    V_Fecha_de_creacion,
                    V_Fecha_de_modificacion,
                    V_Accion,
                    V_Estado
                FROM FIDE_CLIENTES_TB
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
        result.append({
            'FIDE_CLIENTES_V_Id_cliente_PK': row[0],
            'V_Nom_cliente': row[1],
            'V_Ape_cliente': row[2],
            'V_Correo_cliente': row[3],
            'V_Tel_cliente': row[4],
            'V_Direccion_cliente': row[5],
            'V_Creado_por': row[6],
            'V_Modificado_por': row[7],
            'V_Fecha_de_creacion': row[8],
            'V_Fecha_de_modificacion': row[9],
            'V_Accion': row[10],
            'V_Estado': row[11]
        })
    return jsonify(result)

# Ruta para crear un nuevo cliente
@app.route('/api/clientes', methods=['POST'])
def create_cliente():
    try:
        data = request.json
        id_cliente = data['id_cliente']
        nom_cliente = data['nom_cliente']
        ape_cliente = data['ape_cliente']
        correo_cliente = data['correo_cliente']
        tel_cliente = data['tel_cliente']
        direccion_cliente = data['direccion_cliente']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion'] 
        accion = "CREATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CLIENTES_CREATE_SP", [
                id_cliente, nom_cliente, ape_cliente, correo_cliente, tel_cliente, direccion_cliente, 
                creado_por, fecha_creacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating cliente: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un cliente por su ID
@app.route('/api/clientes/<int:id_cliente>', methods=['GET'])
def read_cliente(id_cliente):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_CLIENTES_READ_SP", [id_cliente, result])
            
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
        print(f"Error in read_cliente: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para actualizar un cliente por su ID
@app.route('/api/clientes/<int:id_cliente>', methods=['PUT'])
def update_cliente(id_cliente):
    try:
        data = request.json
        nom_cliente = data['nom_cliente']
        ape_cliente = data['ape_cliente']
        correo_cliente = data['correo_cliente']
        tel_cliente = data['tel_cliente']
        direccion_cliente = data['direccion_cliente']
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion'] 
        accion = "UPDATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_CLIENTES_UPDATE_SP", [
                id_cliente, nom_cliente, ape_cliente, correo_cliente, tel_cliente, direccion_cliente,
                modificado_por, fecha_modificacion, accion, estado
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
                    FIDE_PRODUCTOS_V_Id_producto_PK,
                    V_Nom_producto,
                    V_Piezas_producto,
                    V_Precio_producto,
                    V_Cantidad_producto,
                    V_Descripcion_producto,
                    V_Creado_por,
                    V_Modificado_por,
                    V_Fecha_de_creacion,
                    V_Fecha_de_modificacion,
                    V_Accion,
                    V_Estado
                FROM FIDE_PRODUCTOS_TB
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
        result.append({
            'FIDE_PRODUCTOS_V_Id_producto_PK': row[0],
            'V_Nom_producto': row[1],
            'V_Piezas_producto': row[2],
            'V_Precio_producto': row[3],
            'V_Cantidad_producto': row[4],
            'V_Descripcion_producto': row[5],
            'V_Creado_por': row[6],
            'V_Modificado_por': row[7],
            'V_Fecha_de_creacion': row[8],
            'V_Fecha_de_modificacion': row[9],
            'V_Accion': row[10],
            'V_Estado': row[11]
        })
    return jsonify(result)

# Ruta para crear un nuevo producto
@app.route('/api/productos', methods=['POST'])
def create_producto():
    try:
        data = request.json
        id_producto = data['id_producto']
        nom_producto = data['nom_producto']
        piezas_producto = data['piezas_producto']
        precio_producto = data['precio_producto']
        cantidad_producto = data['cantidad_producto']
        descripcion_producto = data['descripcion_producto']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion']
        accion = "CREATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PRODUCTOS_CREATE_SP", [
                id_producto, nom_producto, piezas_producto, precio_producto, cantidad_producto,
                descripcion_producto, creado_por, fecha_creacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating product: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un producto por su ID
@app.route('/api/productos/<int:id_producto>', methods=['GET'])
def read_producto(id_producto):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_PRODUCTOS_READ_SP", [id_producto, result])
            
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
        print(f"Error in read_producto: {e}")
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
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion']
        accion = "UPDATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PRODUCTOS_UPDATE_SP", [
                id_producto, nom_producto, piezas_producto, precio_producto, cantidad_producto,
                descripcion_producto, modificado_por, fecha_modificacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating product: {e}")
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

# TABLA PROVEEDORES
# Función para obtener datos de los proveedores, trae la tabla completa de la base de datos.
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
                    V_Creado_por,
                    V_Modificado_por,
                    V_Fecha_de_creacion,
                    V_Fecha_de_modificacion,
                    V_Accion,
                    V_Estado
                FROM FIDE_PROVEEDORES_TB
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
        result.append({
            'FIDE_PROVEEDORES_V_Id_proveedor_PK': row[0],
            'V_Nom_provedor': row[1],
            'V_Correo_proveedor': row[2],
            'V_Producto_proveedor': row[3],
            'V_Tel_proveedor': row[4],
            'V_Direccion_proveedor': row[5],
            'V_Creado_por': row[6],
            'V_Modificado_por': row[7],
            'V_Fecha_de_creacion': row[8],
            'V_Fecha_de_modificacion': row[9],
            'V_Accion': row[10],
            'V_Estado': row[11]
        })
    return jsonify(result)

# Ruta para crear un nuevo proveedor
@app.route('/api/proveedores', methods=['POST'])
def create_proveedor():
    try:
        data = request.json
        id_proveedor = data['id_proveedor']
        nom_provedor = data['nom_provedor']
        correo_proveedor = data['correo_proveedor']
        producto_proveedor = data['producto_proveedor']
        tel_proveedor = data['tel_proveedor']
        direccion_proveedor = data['direccion_proveedor']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion']
        accion = "CREATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_CREATE_SP", [
                id_proveedor, nom_provedor, correo_proveedor, producto_proveedor, tel_proveedor, direccion_proveedor, 
                creado_por, fecha_creacion, accion, estado
            ])
            conn.commit()
            cursor.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating proveedor: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Ruta para obtener un proveedor por su ID
@app.route('/api/proveedores/<int:id_proveedor>', methods=['GET'])
def read_proveedor(id_proveedor):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            result = cursor.var(cx_Oracle.CURSOR)
            cursor.callproc("FIDE_PROVEEDORES_READ_SP", [id_proveedor, result])
            
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
        print(f"Error in read_proveedor: {e}")
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
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion']
        accion = "UPDATE"
        estado = "Activo"

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.callproc("FIDE_PROVEEDORES_UPDATE_SP", [
                id_proveedor, nom_provedor, correo_proveedor, producto_proveedor, tel_proveedor, direccion_proveedor,
                modificado_por, fecha_modificacion, accion, estado
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

# Ruta para obtener las tiendas
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
            cursor.execute("""
                SELECT * FROM FIDE_CLIENTES_DESCUENTOS_ENTREGAS_V
            """)
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
            cursor.execute("""
                SELECT * FROM FIDE_PRODUCTOS_PROVEEDORES_V
            """)
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
            cursor.execute("""
                SELECT * FROM FIDE_LOCALES_PRODUCTOS_V
            """)
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
            cursor.execute("""
                SELECT * FROM FIDE_TIPO_DESCUENTOS_CLIENTES_V
            """)
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
            cursor.execute("""
                SELECT * FROM FIDE_ENTREGAS_CLIENTES_CONTACTO_V
            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            cursor.close()
        return jsonify([dict(zip(columns, row)) for row in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)