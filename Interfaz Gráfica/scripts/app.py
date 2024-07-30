from flask import Flask, jsonify, request, send_from_directory
import cx_Oracle

app = Flask(__name__)

# Function to create a database connection
def create_connection():
    try:
        return cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
    except Exception as err:
        print('Error al crear la conexión:', err)
        return None

# Function to get client email
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

if __name__ == '__main__':
    app.run(debug=True)