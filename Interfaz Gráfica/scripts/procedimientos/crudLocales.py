import cx_Oracle
from datetime import datetime

# Función para crear un nuevo local en la base de datos
def create_local(cur):
    # Recopila información del usuario para el nuevo local
    id_local = int(input("Ingrese el ID del local: "))
    nom_local = input("Ingrese el nombre del local: ")
    tel_local = input("Ingrese el teléfono del local: ")
    direccion_local = input("Ingrese la dirección del local: ")
    id_estado = int(input("Ingrese el ID del estado: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    # Llama al procedimiento almacenado para crear el local
    cur.callproc("FIDE_LOCALES_CREATE_SP", [id_local, nom_local, tel_local, direccion_local, id_estado,
                                            creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Local creado exitosamente.")

# Función para leer información de un local existente
def read_local(cur):
    # Solicita el ID del local a consultar
    id_local = int(input("Ingrese el ID del local a consultar: "))
    
    # Ejecuta el procedimiento almacenado para leer el local
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_LOCALES_READ_SP", [id_local, result])
    
    # Imprime los resultados
    for row in result.getvalue():
        print(row)

# Función para actualizar un local existente
def update_local(cur):
    # Recopila información actualizada del usuario
    id_local = int(input("Ingrese el ID del local a actualizar: "))
    nom_local = input("Ingrese el nuevo nombre del local: ")
    tel_local = input("Ingrese el nuevo teléfono del local: ")
    direccion_local = input("Ingrese la nueva dirección del local: ")
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    # Llama al procedimiento almacenado para actualizar el local
    cur.callproc("FIDE_LOCALES_UPDATE_SP", [id_local, nom_local, tel_local, direccion_local, id_estado,
                                            modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Local actualizado exitosamente.")

# Función para eliminar un local
def delete_local(cur):
    # Solicita el ID del local a eliminar
    id_local = int(input("Ingrese el ID del local a eliminar: "))
    
    # Llama al procedimiento almacenado para eliminar el local
    cur.callproc("FIDE_LOCALES_DELETE_SP", [id_local])
    cur.connection.commit()
    
    print("Local eliminado exitosamente.")

# Intenta establecer una conexión con la base de datos
try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        # Bucle principal del programa que muestra el menú y ejecuta las operaciones
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear local")
            print("2. Leer local")
            print("3. Actualizar local")
            print("4. Eliminar local")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            # Ejecuta la función correspondiente según la elección del usuario
            if choice == '1':
                create_local(cur)
            elif choice == '2':
                read_local(cur)
            elif choice == '3':
                update_local(cur)
            elif choice == '4':
                delete_local(cur)
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