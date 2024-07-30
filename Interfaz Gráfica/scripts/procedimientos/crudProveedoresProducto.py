import cx_Oracle
from datetime import datetime

# Función para crear una nueva relación proveedor-producto en la base de datos
def create_supplier_product(cur):
    # Recopila información del usuario para la nueva relación
    id_proveedor = int(input("Ingrese el ID del proveedor: "))
    id_producto = int(input("Ingrese el ID del producto: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
   
    # Llama al procedimiento almacenado para crear la relación
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_CREATE_SP", [id_proveedor, id_producto, creado_por, fecha_creacion, accion])
    cur.connection.commit()
   
    print("Relación proveedor-producto creada exitosamente.")

# Función para leer información de una relación proveedor-producto existente
def read_supplier_product(cur):
    # Solicita los IDs del proveedor y producto a consultar
    id_proveedor = int(input("Ingrese el ID del proveedor a consultar: "))
    id_producto = int(input("Ingrese el ID del producto a consultar: "))
   
    # Ejecuta el procedimiento almacenado para leer la relación
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_READ_SP", [id_proveedor, id_producto, result])
   
    # Imprime los resultados
    for row in result.getvalue():
        print(row)

# Función para actualizar una relación proveedor-producto existente
def update_supplier_product(cur):
    # Recopila información actualizada del usuario
    id_proveedor = int(input("Ingrese el ID del proveedor a actualizar: "))
    id_producto = int(input("Ingrese el ID del producto a actualizar: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
   
    # Llama al procedimiento almacenado para actualizar la relación
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_UPDATE_SP", [id_proveedor, id_producto, modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
   
    print("Relación proveedor-producto actualizada exitosamente.")

# Función para eliminar una relación proveedor-producto
def delete_supplier_product(cur):
    # Solicita los IDs del proveedor y producto a eliminar
    id_proveedor = int(input("Ingrese el ID del proveedor a eliminar: "))
    id_producto = int(input("Ingrese el ID del producto a eliminar: "))
   
    # Llama al procedimiento almacenado para eliminar la relación
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_DELETE_SP", [id_proveedor, id_producto])
    cur.connection.commit()
   
    print("Relación proveedor-producto eliminada exitosamente.")

# Intenta establecer una conexión con la base de datos
try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
       
        # Bucle principal del programa
        while True:
            # Muestra el menú de opciones al usuario
            print("\nSeleccione una operación:")
            print("1. Crear relación proveedor-producto")
            print("2. Leer relación proveedor-producto")
            print("3. Actualizar relación proveedor-producto")
            print("4. Eliminar relación proveedor-producto")
            print("5. Salir")
           
            choice = input("Ingrese su elección (1-5): ")
           
            # Ejecuta la función correspondiente según la elección del usuario
            if choice == '1':
                create_supplier_product(cur)
            elif choice == '2':
                read_supplier_product(cur)
            elif choice == '3':
                update_supplier_product(cur)
            elif choice == '4':
                delete_supplier_product(cur)
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