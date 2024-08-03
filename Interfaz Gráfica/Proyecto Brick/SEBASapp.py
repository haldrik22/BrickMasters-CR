from flask import Flask, jsonify, request, send_from_directory
import cx_Oracle
from flask_cors import CORS #Se importa el Flask Cors 

app = Flask(__name__)
CORS(app, origins="*") #Se inicializa

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response
 
@app.route('/<path:path>', methods=['OPTIONS'])
def options(path):
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response

# Function to create a database connection
def create_connection():
    try:
        return cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
    except Exception as err:
        print('Error al crear la conexión:', err)
        return None

# Funcion para obtener el correo de cliente
def obtener_correo_cliente(cur, id_cliente):
    try:
        result = cur.callfunc('FIDE_CLIENTES_OBTENER_CORREO_FN', cx_Oracle.STRING, [id_cliente])
        return result
    except Exception as err:
        print('Error al obtener correo:', err)
        return None
    
# Se usa la conexión con las funciones
@app.route('/')
def index():
    return send_from_directory('static', 'htmlFunciones.html')

# Obtener correo cliente
@app.route('/obtener_correo_cliente', methods=['POST'])
def api_obtener_correo_cliente():
    data = request.json
    id_cliente = data.get('id_cliente')
    if id_cliente is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            correo = obtener_correo_cliente(cursor, id_cliente)
            cursor.close()
            conn.close()
            return jsonify({'correo': correo})
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID de cliente no proporcionado'}), 400
 
# Funcion Obtener Precio
@app.route('/obtener_precio_producto', methods=['POST'])
def api_obtener_precio_producto():
    data = request.json
    id_producto = data.get('id_producto')
    if id_producto is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                precio = cursor.callfunc('FIDE_PRODUCTOS_OBTENER_PRECIO_FN', cx_Oracle.NUMBER, [id_producto])
                return jsonify({'precio': precio})
            except Exception as err:
                print('Error al obtener el precio del producto:', err)
                return jsonify({'error': 'Error al obtener el precio del producto'}), 500
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID del producto no proporcionado'}), 400
 
#Funcion Calcular Monto Descuento
@app.route('/calcular_monto_descuento', methods=['POST'])
def api_calcular_monto_descuento():
    data = request.json
    id_descuento = data.get('id_descuento')
    subtotal = data.get('subtotal')
    if id_descuento is not None and subtotal is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                monto_descuento = cursor.callfunc('FIDE_DESCUENTOS_CALCULAR_MONTO_FN', cx_Oracle.NUMBER, [id_descuento, subtotal])
                return jsonify({'monto_descuento': monto_descuento})
            except Exception as err:
                print('Error al calcular el monto del descuento:', err)
                return jsonify({'error': 'Error al calcular el monto del descuento'}), 500
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID del descuento o subtotal no proporcionados'}), 400
 
#Chequear Disponibilidad de Producto
@app.route('/verificar_disponibilidad_producto', methods=['POST'])
def api_verificar_disponibilidad_producto():
    data = request.json
    id_producto = data.get('id_producto')
    if id_producto is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                disponibilidad = cursor.callfunc('FIDE_PRODUCTOS_CHECK_DISPONIBILIDAD_FN', cx_Oracle.STRING, [id_producto])
                return jsonify({'disponibilidad': disponibilidad})
            except Exception as err:
                print('Error al verificar disponibilidad del producto:', err)
                return jsonify({'error': 'Error al verificar disponibilidad del producto'}), 500
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID del producto no proporcionado'}), 400
 
#Contacto Proveedor
@app.route('/obtener_contacto_proveedor', methods=['POST'])
def api_obtener_contacto_proveedor():
    data = request.json
    id_proveedor = data.get('id_proveedor')
    if id_proveedor is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                contacto = cursor.callfunc('FIDE_PROVEEDORES_OBTENER_CONTACTO_FN', cx_Oracle.STRING, [id_proveedor])
                return jsonify({'contacto': contacto})
            except Exception as err:
                print('Error al obtener información de contacto del proveedor:', err)
                return jsonify({'error': 'Error al obtener información de contacto del proveedor'}), 500
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID del proveedor no proporcionado'}), 400
 
# Porcentaje Descuento Cliente
@app.route('/obtener_porcentaje_descuento', methods=['POST'])
def api_obtener_porcentaje_descuento():
    data = request.json
    id_cliente = data.get('id_cliente')
    if id_cliente is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                porcentaje_descuento = cursor.callfunc('FIDE_CLIENTES_OBTENER_PORCENTAJE_DESCUENTO_FN', cx_Oracle.NUMBER, [id_cliente])
                return jsonify({'porcentaje_descuento': porcentaje_descuento})
            except Exception as err:
                print('Error al obtener porcentaje de descuento del cliente:', err)
                return jsonify({'error': 'Error al obtener porcentaje de descuento del cliente'}), 500
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID de cliente no proporcionado'}), 400
 
#Obtener total de Ordenes de Cliente
@app.route('/obtener_total_ordenes_cliente', methods=['POST'])
def api_obtener_total_ordenes_cliente():
    data = request.json
    id_cliente = data.get('id_cliente')
    if id_cliente is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                total_ordenes = cursor.callfunc('FIDE_CLIENTES_OBTENER_TOTAL_ORDENES_FN', cx_Oracle.NUMBER, [id_cliente])
                return jsonify({'total_ordenes': total_ordenes})
            except Exception as err:
                print('Error al obtener total de órdenes del cliente:', err)
                return jsonify({'error': 'Error al obtener total de órdenes del cliente'}), 500
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID de cliente no proporcionado'}), 400
 
#Obtener total de Ventas de un Producto
@app.route('/obtener_total_ventas_producto', methods=['POST'])
def api_obtener_total_ventas_producto():
    data = request.json
    id_producto = data.get('id_producto')
    if id_producto is not None:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                total_ventas = cursor.callfunc('FIDE_VENTAS_OBTENER_TOTAL_VENTAS_FN', cx_Oracle.NUMBER, [id_producto])
                return jsonify({'total_ventas': total_ventas})
            except Exception as err:
                print('Error al obtener total de ventas del producto:', err)
                return jsonify({'error': 'Error al obtener total de ventas del producto'}), 500
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    else:
        return jsonify({'error': 'ID de producto no proporcionado'}), 400
 

if __name__ == '__main__':
    app.run(debug=True)

   #--------------------------------------------TABLAS---------------------------------------------
# Tabla Proveedores
def fetch_proveedores():
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
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
        conn.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

@app.route('/api/proveedores', methods=['GET'])
def get_proveedores():
    data = fetch_proveedores()
    # Convert data to a list of dictionaries for easier JSON serialization
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

@app.route('/api/proveedores', methods=['POST'])
def create_proveedor():
    try:
        data = request.json
        id_proveedor = data['id_proveedor']
        nom_proveedor = data['nom_proveedor']
        correo_proveedor = data['correo_proveedor']
        producto_proveedor = data['producto_proveedor']
        tel_proveedor = data['tel_proveedor']
        direccion_proveedor = data['direccion_proveedor']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion'] 
        accion = "CREATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_PROVEEDORES_CREATE_SP", [
            id_proveedor, nom_proveedor, correo_proveedor, producto_proveedor, tel_proveedor, 
            direccion_proveedor, creado_por, fecha_creacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating proveedor: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/proveedores/<int:id_proveedor>', methods=['GET'])
def read_proveedor(id_proveedor):
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
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
        conn.close()
        
        return jsonify(rows_dict), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Database error: {error.message}")
        return jsonify({'status': 'error', 'message': 'Database error occurred.'}), 500
    except Exception as e:
        print(f"Error in read_proveedor: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/proveedores/<int:id_proveedor>', methods=['PUT'])
def update_proveedor(id_proveedor):
    try:
        data = request.json
        nom_proveedor = data['nom_proveedor']
        correo_proveedor = data['correo_proveedor']
        producto_proveedor = data['producto_proveedor']
        tel_proveedor = data['tel_proveedor']
        direccion_proveedor = data['direccion_proveedor']
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion'] 
        accion = "UPDATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_PROVEEDORES_UPDATE_SP", [
            id_proveedor, nom_proveedor, correo_proveedor, producto_proveedor, tel_proveedor, 
            direccion_proveedor, modificado_por, fecha_modificacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating proveedor: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/api/proveedores/<int:id_proveedor>', methods=['DELETE'])
def delete_proveedor(id_proveedor):
    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_PROVEEDORES_DELETE_SP", [id_proveedor])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
    #--------------------------------------------TABLAS---------------------------------------------
# Tabla Tipo Descuento
def fetch_discount_types():
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
        cur = conn.cursor()
        cur.execute("""
            SELECT
                FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK,
                FIDE_TIPO_DESCUENTO_V_Id_cliente_FK,
                FIDE_TIPO_DESCUENTO_V_Id_estado_FK,
                V_Porcentaje_descuento,
                V_Creado_por,
                V_Modificado_por,
                V_Fecha_de_creacion,
                V_Fecha_de_modificacion,
                V_Accion,
                V_Estado
            FROM FIDE_TIPO_DESCUENTO_TB
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

@app.route('/api/discount_types', methods=['GET'])
def get_discount_types():
    data = fetch_discount_types()
    # Convert data to a list of dictionaries for easier JSON serialization
    result = []
    for row in data:
        result.append({
            'FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK': row[0],
            'FIDE_TIPO_DESCUENTO_V_Id_cliente_FK': row[1],
            'FIDE_TIPO_DESCUENTO_V_Id_estado_FK': row[2],
            'V_Porcentaje_descuento': row[3],
            'V_Creado_por': row[4],
            'V_Modificado_por': row[5],
            'V_Fecha_de_creacion': row[6],
            'V_Fecha_de_modificacion': row[7],
            'V_Accion': row[8],
            'V_Estado': row[9]
        })
    return jsonify(result)

@app.route('/api/discount_types', methods=['POST'])
def create_discount_type():
    try:
        data = request.json
        id_tipo_descuento = data['id_tipo_descuento']
        id_cliente = data['id_cliente']
        id_estado = data['id_estado']
        porcentaje_descuento = data['porcentaje_descuento']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion'] 
        accion = "CREATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_TIPO_DESCUENTO_CREATE_SP", [
            id_tipo_descuento, id_cliente, id_estado, porcentaje_descuento, 
            creado_por, fecha_creacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating discount type: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/discount_types/<int:id_tipo_descuento>', methods=['GET'])
def read_discount_type(id_tipo_descuento):
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
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
        conn.close()
        
        return jsonify(rows_dict), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Database error: {error.message}")
        return jsonify({'status': 'error', 'message': 'Database error occurred.'}), 500
    except Exception as e:
        print(f"Error in read_discount_type: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500



@app.route('/api/discount_types/<int:id_tipo_descuento>', methods=['PUT'])
def update_discount_type(id_tipo_descuento):
    try:
        data = request.json
        id_cliente = data['id_cliente']
        id_estado = data['id_estado']
        porcentaje_descuento = data['porcentaje_descuento']
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion'] 
        accion = "UPDATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_TIPO_DESCUENTO_UPDATE_SP", [
            id_tipo_descuento, id_cliente, id_estado, porcentaje_descuento,
            modificado_por, fecha_modificacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating discount type: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/api/discount_types/<int:id_tipo_descuento>', methods=['DELETE'])
def delete_discount_type(id_tipo_descuento):
    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_TIPO_DESCUENTO_DELETE_SP", [id_tipo_descuento])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
    #--------------------------------------------TABLAS---------------------------------------------
# Tabla Descuentos
def fetch_discounts():
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
        cur = conn.cursor()
        cur.execute("""
            SELECT
                FIDE_DESCUENTOS_V_Id_descuento_PK,
                FIDE_DESCUENTOS_V_Id_cliente_FK,
                FIDE_DESCUENTOS_V_Id_tipo_descuento_FK,
                V_Creado_por,
                V_Modificado_por,
                V_Fecha_de_creacion,
                V_Fecha_de_modificacion,
                V_Accion,
                V_Estado
            FROM FIDE_DESCUENTOS_TB
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

@app.route('/api/discounts', methods=['GET'])
def get_discounts():
    data = fetch_discounts()
    # Convert data to a list of dictionaries for easier JSON serialization
    result = []
    for row in data:
        result.append({
            'FIDE_DESCUENTOS_V_Id_descuento_PK': row[0],
            'FIDE_DESCUENTOS_V_Id_cliente_FK': row[1],
            'FIDE_DESCUENTOS_V_Id_tipo_descuento_FK': row[2],
            'V_Creado_por': row[3],
            'V_Modificado_por': row[4],
            'V_Fecha_de_creacion': row[5],
            'V_Fecha_de_modificacion': row[6],
            'V_Accion': row[7],
            'V_Estado': row[8]
        })
    return jsonify(result)

@app.route('/api/discounts', methods=['POST'])
def create_discount():
    try:
        data = request.json
        id_descuento = data['id_descuento']
        id_cliente = data['id_cliente']
        id_tipo_descuento = data['id_tipo_descuento']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion'] 
        accion = "CREATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_DESCUENTOS_CREATE_SP", [
            id_descuento, id_cliente, id_tipo_descuento, creado_por, fecha_creacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating discount: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/discounts/<int:id_descuento>', methods=['GET'])
def read_discount(id_descuento):
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
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
        conn.close()
        
        return jsonify(rows_dict), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Database error: {error.message}")
        return jsonify({'status': 'error', 'message': 'Database error occurred.'}), 500
    except Exception as e:
        print(f"Error in read_discount: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500



@app.route('/api/discounts/<int:id_descuento>', methods=['PUT'])
def update_discount(id_descuento):
    try:
        data = request.json
        id_cliente = data['id_cliente']
        id_tipo_descuento = data['id_tipo_descuento']
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion'] 
        accion = "UPDATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_DESCUENTOS_UPDATE_SP", [
            id_descuento, id_cliente, id_tipo_descuento, modificado_por, fecha_modificacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error updating discount: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/api/discounts/<int:id_descuento>', methods=['DELETE'])
def delete_discount(id_descuento):
    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_DESCUENTOS_DELETE_SP", [id_descuento])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
    #--------------------------------------------TABLAS---------------------------------------------
# Tabla Facturacion
def fetch_facturacion():
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
        cur = conn.cursor()
        cur.execute("""
            SELECT
                FIDE_FACTURACION_V_Id_factura_PK,
                FIDE_FACTURACION_V_Id_producto_FK,
                FIDE_FACTURACION_V_Id_descuento_FK,
                FIDE_FACTURACION_V_Id_cliente_FK,
                FIDE_FACTURACION_V_Id_local_FK,
                V_Cantidad_producto,
                V_Precio_Subtotal,
                V_Precio_Total,
                V_Fecha_pago,
                V_Creado_por,
                V_Modificado_por,
                V_Fecha_de_creacion,
                V_Fecha_de_modificacion,
                V_Accion,
                V_Estado
            FROM FIDE_FACTURACION_TB
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

@app.route('/api/facturacion', methods=['GET'])
def get_facturacion():
    data = fetch_facturacion()
    # Convert data to a list of dictionaries for easier JSON serialization
    result = []
    for row in data:
        result.append({
            'FIDE_FACTURACION_V_Id_factura_PK': row[0],
            'FIDE_FACTURACION_V_Id_producto_FK': row[1],
            'FIDE_FACTURACION_V_Id_descuento_FK': row[2],
            'FIDE_FACTURACION_V_Id_cliente_FK': row[3],
            'FIDE_FACTURACION_V_Id_local_FK': row[4],
            'V_Cantidad_producto': row[5],
            'V_Precio_Subtotal': row[6],
            'V_Precio_Total': row[7],
            'V_Fecha_pago': row[8],
            'V_Creado_por': row[9],
            'V_Modificado_por': row[10],
            'V_Fecha_de_creacion': row[11],
            'V_Fecha_de_modificacion': row[12],
            'V_Accion': row[13],
            'V_Estado': row[14]
        })
    return jsonify(result)

@app.route('/api/facturacion', methods=['POST'])
def create_facturacion():
    try:
        data = request.json
        id_factura = data['id_factura']
        id_producto = data['id_producto']
        id_descuento = data['id_descuento']
        id_cliente = data['id_cliente']
        id_local = data['id_local']
        cantidad_producto = data['cantidad_producto']
        precio_subtotal = data['precio_subtotal']
        precio_total = data['precio_total']
        fecha_pago = data['fecha_pago']
        creado_por = data['creado_por']
        fecha_creacion = data['fecha_creacion']
        accion = "CREATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_FACTURACION_CREATE_SP", [
            id_factura, id_producto, id_descuento, id_cliente, id_local, 
            cantidad_producto, precio_subtotal, precio_total, fecha_pago,
            creado_por, fecha_creacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating invoice: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/facturacion/<int:id_factura>', methods=['GET'])
def read_facturacion(id_factura):
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
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
        conn.close()
        
        return jsonify(rows_dict), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Database error: {error.message}")
        return jsonify({'status': 'error', 'essage': 'Database error occurred.'}), 500
    except Exception as e:
        print(f"Error in read_facturacion: {e}")
        return jsonify({'status': 'error', 'essage': str(e)}), 500


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
        modificado_por = data['modificado_por']
        fecha_modificacion = data['fecha_modificacion']
        accion = "UPDATE"
        estado = "Activo"

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_FACTURACION_UPDATE_SP", [
            id_factura, id_producto, id_descuento, id_cliente, id_local, 
            cantidad_producto, precio_subtotal, precio_total, fecha_pago,
            modificado_por, fecha_modificacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'uccess'}), 200
    except Exception as e:
        print(f"Error updating invoice: {e}")
        return jsonify({'status': 'error', 'essage': str(e)}), 500


@app.route('/api/facturacion/<int:id_factura>', methods=['DELETE'])
def delete_facturacion(id_factura):
    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_FACTURACION_DELETE_SP", [id_factura])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'uccess'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'essage': str(e)}), 500
    
 #--------------------------------------------TABLAS---------------------------------------------
# Tabla Ventas
def fetch_ventas():
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
        cur = conn.cursor()
        cur.execute("""
            SELECT
                FIDE_VENTAS_V_Id_venta_PK,
                FIDE_VENTAS_V_Id_factura_FK,
                FIDE_VENTAS_V_Id_producto_FK,
                FIDE_VENTAS_V_Id_local_FK,
                FIDE_VENTAS_V_Id_entrega_FK,
                V_Creado_por,
                V_Modificado_por,
                V_Fecha_de_creacion,
                V_Fecha_de_modificacion,
                V_Accion,
                V_Estado
            FROM FIDE_VENTAS_TB
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []

@app.route('/api/ventas', methods=['GET'])
def get_ventas():
    data = fetch_ventas()
    # Convert data to a list of dictionaries for easier JSON serialization
    result = []
    for row in data:
        result.append({
            'FIDE_VENTAS_V_Id_venta_PK': row[0],
            'FIDE_VENTAS_V_Id_factura_FK': row[1],
            'FIDE_VENTAS_V_Id_producto_FK': row[2],
            'FIDE_VENTAS_V_Id_local_FK': row[3],
            'FIDE_VENTAS_V_Id_entrega_FK': row[4],
            'V_Creado_por': row[5],
            'V_Modificado_por': row[6],
            'V_Fecha_de_creacion': row[7],
            'V_Fecha_de_modificacion': row[8],
            'V_Accion': row[9],
            'V_Estado': row[10]
        })
    return jsonify(result)

@app.route('/api/ventas', methods=['POST'])
def create_venta():
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

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_VENTAS_CREATE_SP", [
            id_venta, id_factura, id_producto, id_local, id_entrega,
            creado_por, fecha_creacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Error creating sale: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/ventas/<int:id_venta>', methods=['GET'])
def read_venta(id_venta):
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
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
        conn.close()
        
        return jsonify(rows_dict), 200

    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Database error: {error.message}")
        return jsonify({'status': 'error', 'message': 'Database error occurred.'}), 500
    except Exception as e:
        print(f"Error in read_venta: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/ventas/<int:id_venta>', methods=['PUT'])
def update_venta(id_venta):
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

        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_VENTAS_UPDATE_SP", [
            id_venta, id_factura, id_producto, id_local, id_entrega,
            modificado_por, fecha_modificacion, accion, estado
        ])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'uccess'}), 200
    except Exception as e:
        print(f"Error updating sale: {e}")
        return jsonify({'status': 'error', 'essage': str(e)}), 500


@app.route('/api/ventas/<int:id_venta>', methods=['DELETE'])
def delete_venta(id_venta):
    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.callproc("FIDE_VENTAS_DELETE_SP", [id_venta])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'uccess'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'essage': str(e)}), 500 