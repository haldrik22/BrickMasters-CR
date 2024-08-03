import cx_Oracle
from datetime import datetime

def fetch_catalogo():
    try:
        conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
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
        conn.close()
        return rows
    except Exception as err:
        print('Error al crear la conexión:', err)
        return []
    
def create_catalog(cur):
    id_producto = int(input("Ingrese el ID del producto: "))
    nom_producto = input("Ingrese el nombre del producto: ")
    precio_producto = float(input("Ingrese el precio del producto: "))
    descripcion_producto = input("Ingrese la descripcion del producto: ")
    cantidad_producto = int(input("Ingrese la cantidad del producto: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    estado = "Activo"

    cur.callproc("FIDE_CATALOGO_CREATE_SP", [id_producto, nom_producto, precio_producto, descripcion_producto, cantidad_producto, creado_por, fecha_creacion, accion, estado])
    cur.connection.commit()

    print("Catálogo creado exitosamente.")

import cx_Oracle

def read_catalog(cur):
    id_producto = int(input("Ingrese el ID del producto a consultar: "))
    
    result_cursor = cur.var(cx_Oracle.CURSOR)
    
    try:
        cur.callproc("FIDE_CATALOGO_READ_SP", [id_producto, result_cursor])
        
        result = result_cursor.getvalue()
        
        if result is None:
            print("No catalog entry found for the given ID.")
        else:
            for row in result:
                print(row)
                
    except cx_Oracle.DatabaseError as e:
        print(f"Database error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")


def update_catalog(cur):
    id_producto = int(input("Ingrese el ID del producto a actualizar: "))
    nom_producto = input("Ingrese el nuevo nombre del producto: ")
    precio_producto = float(input("Ingrese el nuevo precio del producto: "))
    descripcion_producto = input("Ingrese la nueva descripcion del producto: ")
    cantidad_producto = int(input("Ingrese la nueva cantidad del producto: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    estado = "Activo"

    cur.callproc("FIDE_CATALOGO_UPDATE_SP", [id_producto, nom_producto, precio_producto, descripcion_producto, cantidad_producto, modificado_por, fecha_modificacion, accion, estado])
    cur.connection.commit()

    print("Catálogo actualizado exitosamente.")


def delete_catalog(cur):
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