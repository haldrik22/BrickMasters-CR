import cx_Oracle
from datetime import datetime

def create_catalog(cur):
    # Recolecta datos del usuario y llama al procedimiento almacenado para crear un catálogo
    id_producto = int(input("Ingrese el ID del producto: "))
    nom_producto = input("Ingrese el nombre del producto: ")
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
   
    cur.callproc("FIDE_CATALOGO_CREATE_SP", [id_producto, nom_producto, creado_por, fecha_creacion, accion])
    cur.connection.commit()
   
    print("Catálogo creado exitosamente.")

def read_catalog(cur):
    # Lee y muestra la información de un catálogo específico
    id_producto = int(input("Ingrese el ID del producto a consultar: "))
   
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_CATALOGO_READ_SP", [id_producto, result])
   
    for row in result.getvalue():
        print(row)

def update_catalog(cur):
    # Actualiza la información de un catálogo existente
    id_producto = int(input("Ingrese el ID del producto a actualizar: "))
    nom_producto = input("Ingrese el nuevo nombre del producto: ")
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
   
    cur.callproc("FIDE_CATALOGO_UPDATE_SP", [id_producto, nom_producto, modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
   
    print("Catálogo actualizado exitosamente.")

def delete_catalog(cur):
    # Elimina un catálogo existente
    id_producto = int(input("Ingrese el ID del producto a eliminar del catálogo: "))
   
    cur.callproc("FIDE_CATALOGO_DELETE_SP", [id_producto])
    cur.connection.commit()
   
    print("Producto eliminado del catálogo exitosamente.")

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
            print("1. Crear entrada en el catálogo")
            print("2. Leer entrada del catálogo")
            print("3. Actualizar entrada del catálogo")
            print("4. Eliminar entrada del catálogo")
            print("5. Salir")
           
            choice = input("Ingrese su elección (1-5): ")
           
            if choice == '1':
                create_catalog(cur)
            elif choice == '2':
                read_catalog(cur)
            elif choice == '3':
                update_catalog(cur)
            elif choice == '4':
                delete_catalog(cur)
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