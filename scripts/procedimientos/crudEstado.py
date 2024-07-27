import cx_Oracle
from datetime import datetime

def create_state(cur):
    id_estado = int(input("Ingrese el ID del estado: "))
    tipo = input("Ingrese el tipo de estado: ")
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_ESTADO_CREATE_SP", [id_estado, tipo, creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Estado creado exitosamente.")

def read_state(cur):
    id_estado = int(input("Ingrese el ID del estado a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_ESTADO_READ_SP", [id_estado, result])
    
    for row in result.getvalue():
        print(row)

def update_state(cur):
    id_estado = int(input("Ingrese el ID del estado a actualizar: "))
    tipo = input("Ingrese el nuevo tipo de estado: ")
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_ESTADO_UPDATE_SP", [id_estado, tipo, modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Estado actualizado exitosamente.")

def delete_state(cur):
    id_estado = int(input("Ingrese el ID del estado a eliminar: "))
    
    cur.callproc("FIDE_ESTADO_DELETE_SP", [id_estado])
    cur.connection.commit()
    
    print("Estado eliminado exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear estado")
            print("2. Leer estado")
            print("3. Actualizar estado")
            print("4. Eliminar estado")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_state(cur)
            elif choice == '2':
                read_state(cur)
            elif choice == '3':
                update_state(cur)
            elif choice == '4':
                delete_state(cur)
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