import cx_Oracle
from datetime import datetime

# Función para crear un nuevo producto en la base de datos
def create_product(cur):
    # Recopila información del usuario para el nuevo producto
    id_producto = int(input("Ingrese el ID del producto: "))
    nom_producto = input("Ingrese el nombre del producto: ")
    piezas_producto = int(input("Ingrese la cantidad de piezas del producto: "))
    precio_producto = float(input("Ingrese el precio del producto: "))
    cantidad_producto = int(input("Ingrese la cantidad del producto: "))
    descripcion_producto = input("Ingrese la descripción del producto: ")
    id_estado = int(input("Ingrese el ID del estado: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
   
    # Llama al procedimiento almacenado para crear el producto
    cur.callproc("FIDE_PRODUCTOS_CREATE_SP", [id_producto, nom_producto, piezas_producto, precio_producto,
                                              cantidad_producto, descripcion_producto, id_estado, creado_por,
                                              fecha_creacion, accion])
    cur.connection.commit()
   
    print("Producto creado exitosamente.")

# Función para leer información de un producto existente
def read_product(cur):
    # Solicita el ID del producto a consultar
    id_producto = int(input("Ingrese el ID del producto a consultar: "))
   
    # Ejecuta el procedimiento almacenado para leer el producto
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_PRODUCTOS_READ_SP", [id_producto, result])
   
    # Imprime los resultados
    for row in result.getvalue():
        print(row)

# Función para actualizar un producto existente
def update_product(cur):
    # Recopila información actualizada del usuario
    id_producto = int(input("Ingrese el ID del producto a actualizar: "))
    nom_producto = input("Ingrese el nuevo nombre del producto: ")
    piezas_producto = int(input("Ingrese la nueva cantidad de piezas del producto: "))
    precio_producto = float(input("Ingrese el nuevo precio del producto: "))
    cantidad_producto = int(input("Ingrese la nueva cantidad del producto: "))
    descripcion_producto = input("Ingrese la nueva descripción del producto: ")
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
   
    # Llama al procedimiento almacenado para actualizar el producto
    cur.callproc("FIDE_PRODUCTOS_UPDATE_SP", [id_producto, nom_producto, piezas_producto, precio_producto,
                                              cantidad_producto, descripcion_producto, id_estado, modificado_por,
                                              fecha_modificacion, accion])
    cur.connection.commit()
   
    print("Producto actualizado exitosamente.")

# Función para eliminar un producto
def delete_product(cur):
    # Solicita el ID del producto a eliminar
    id_producto = int(input("Ingrese el ID del producto a eliminar: "))
   
    # Llama al procedimiento almacenado para eliminar el producto
    cur.callproc("FIDE_PRODUCTOS_DELETE_SP", [id_producto])
    cur.connection.commit()
   
    print("Producto eliminado exitosamente.")

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
            print("1. Crear producto")
            print("2. Leer producto")
            print("3. Actualizar producto")
            print("4. Eliminar producto")
            print("5. Salir")
           
            choice = input("Ingrese su elección (1-5): ")
           
            # Ejecuta la función correspondiente según la elección del usuario
            if choice == '1':
                create_product(cur)
            elif choice == '2':
                read_product(cur)
            elif choice == '3':
                update_product(cur)
            elif choice == '4':
                delete_product(cur)
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