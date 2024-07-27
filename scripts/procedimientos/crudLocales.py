import cx_Oracle
from datetime import datetime

def create_local(cur):
    id_local = int(input("Ingrese el ID del local: "))
    nom_local = input("Ingrese el nombre del local: ")
    tel_local = input("Ingrese el teléfono del local: ")
    direccion_local = input("Ingrese la dirección del local: ")
    id_estado = int(input("Ingrese el ID del estado: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_LOCALES_CREATE_SP", [id_local, nom_local, tel_local, direccion_local, id_estado,
                                            creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Local creado exitosamente.")

def read_local(cur):
    id_local = int(input("Ingrese el ID del local a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_LOCALES_READ_SP", [id_local, result])
    
    for row in result.getvalue():
        print(row)

def update_local(cur):
    id_local = int(input("Ingrese el ID del local a actualizar: "))
    nom_local = input("Ingrese el nuevo nombre del local: ")
    tel_local = input("Ingrese el nuevo teléfono del local: ")
    direccion_local = input("Ingrese la nueva dirección del local: ")
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_LOCALES_UPDATE_SP", [id_local, nom_local, tel_local, direccion_local, id_estado,
                                            modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Local actualizado exitosamente.")

def delete_local(cur):
    id_local = int(input("Ingrese el ID del local a eliminar: "))
    
    cur.callproc("FIDE_LOCALES_DELETE_SP", [id_local])
    cur.connection.commit()
    
    print("Local eliminado exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear local")
            print("2. Leer local")
            print("3. Actualizar local")
            print("4. Eliminar local")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
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