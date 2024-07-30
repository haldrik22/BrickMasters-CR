import cx_Oracle
from datetime import datetime

def create_client(cur):
    # Recolecta datos del usuario y llama al procedimiento almacenado para crear un cliente
    id_cliente = int(input("Ingrese el ID del cliente: "))
    nom_cliente = input("Ingrese el nombre del cliente: ")
    ape_cliente = input("Ingrese el apellido del cliente: ")
    correo_cliente = input("Ingrese el correo del cliente: ")
    tel_cliente = input("Ingrese el teléfono del cliente: ")
    direccion_cliente = input("Ingrese la dirección del cliente: ")
    id_estado = int(input("Ingrese el ID del estado: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    cur.callproc("FIDE_CLIENTES_CREATE_SP", [id_cliente, nom_cliente, ape_cliente, correo_cliente, tel_cliente,
                                             direccion_cliente, id_estado, creado_por, fecha_creacion, accion])
    cur.connection.commit()
    print("Cliente creado exitosamente.")

def read_client(cur):
    # Lee y muestra la información de un cliente específico
    id_cliente = int(input("Ingrese el ID del cliente a consultar: "))
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_CLIENTES_READ_SP", [id_cliente, result])
    for row in result.getvalue():
        print(row)

def update_client(cur):
    # Actualiza la información de un cliente existente
    id_cliente = int(input("Ingrese el ID del cliente a actualizar: "))
    nom_cliente = input("Ingrese el nuevo nombre del cliente: ")
    ape_cliente = input("Ingrese el nuevo apellido del cliente: ")
    correo_cliente = input("Ingrese el nuevo correo del cliente: ")
    tel_cliente = input("Ingrese el nuevo teléfono del cliente: ")
    direccion_cliente = input("Ingrese la nueva dirección del cliente: ")
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    cur.callproc("FIDE_CLIENTES_UPDATE_SP", [id_cliente, nom_cliente, ape_cliente, correo_cliente, tel_cliente,
                                             direccion_cliente, id_estado, modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    print("Cliente actualizado exitosamente.")

def delete_client(cur):
    # Elimina un cliente existente
    id_cliente = int(input("Ingrese el ID del cliente a eliminar: "))
    cur.callproc("FIDE_CLIENTES_DELETE_SP", [id_cliente])
    cur.connection.commit()
    print("Cliente eliminado exitosamente.")

try:
    # Intenta establecer una conexión con la base de datos Oracle
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        # Bucle principal del programa que muestra el menú y ejecuta las operaciones
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear cliente")
            print("2. Leer cliente")
            print("3. Actualizar cliente")
            print("4. Eliminar cliente")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_client(cur)
            elif choice == '2':
                read_client(cur)
            elif choice == '3':
                update_client(cur)
            elif choice == '4':
                delete_client(cur)
            elif choice == '5':
                break
            else:
                print("Opción no válida. Por favor, intente de nuevo.")
        
    except Exception as err:
        print('Error al ejecutar la operación:', err)
    finally:
        cur.close()
finally:
    conn.close()