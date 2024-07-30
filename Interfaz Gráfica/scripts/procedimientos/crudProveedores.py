import cx_Oracle
from datetime import datetime

# Función para crear un nuevo proveedor en la base de datos
def create_supplier(cur):
    # Recopila información del usuario para el nuevo proveedor
    id_proveedor = int(input("Ingrese el ID del proveedor: "))
    nom_proveedor = input("Ingrese el nombre del proveedor: ")
    correo_proveedor = input("Ingrese el correo del proveedor: ")
    producto_proveedor = input("Ingrese el producto del proveedor: ")
    tel_proveedor = input("Ingrese el teléfono del proveedor: ")
    direccion_proveedor = input("Ingrese la dirección del proveedor: ")
    id_estado = int(input("Ingrese el ID del estado: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
   
    # Llama al procedimiento almacenado para crear el proveedor
    cur.callproc("FIDE_PROVEEDORES_CREATE_SP", [id_proveedor, nom_proveedor, correo_proveedor, producto_proveedor,
                                                tel_proveedor, direccion_proveedor, id_estado, creado_por,
                                                fecha_creacion, accion])
    cur.connection.commit()
   
    print("Proveedor creado exitosamente.")

# Función para leer información de un proveedor existente
def read_supplier(cur):
    # Solicita el ID del proveedor a consultar
    id_proveedor = int(input("Ingrese el ID del proveedor a consultar: "))
   
    # Ejecuta el procedimiento almacenado para leer el proveedor
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_PROVEEDORES_READ_SP", [id_proveedor, result])
   
    # Imprime los resultados
    for row in result.getvalue():
        print(row)

# Función para actualizar un proveedor existente
def update_supplier(cur):
    # Recopila información actualizada del usuario
    id_proveedor = int(input("Ingrese el ID del proveedor a actualizar: "))
    nom_proveedor = input("Ingrese el nuevo nombre del proveedor: ")
    correo_proveedor = input("Ingrese el nuevo correo del proveedor: ")
    producto_proveedor = input("Ingrese el nuevo producto del proveedor: ")
    tel_proveedor = input("Ingrese el nuevo teléfono del proveedor: ")
    direccion_proveedor = input("Ingrese la nueva dirección del proveedor: ")
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
   
    # Llama al procedimiento almacenado para actualizar el proveedor
    cur.callproc("FIDE_PROVEEDORES_UPDATE_SP", [id_proveedor, nom_proveedor, correo_proveedor, producto_proveedor,
                                                tel_proveedor, direccion_proveedor, id_estado, modificado_por,
                                                fecha_modificacion, accion])
    cur.connection.commit()
   
    print("Proveedor actualizado exitosamente.")

# Función para eliminar un proveedor
def delete_supplier(cur):
    # Solicita el ID del proveedor a eliminar
    id_proveedor = int(input("Ingrese el ID del proveedor a eliminar: "))
   
    # Llama al procedimiento almacenado para eliminar el proveedor
    cur.callproc("FIDE_PROVEEDORES_DELETE_SP", [id_proveedor])
    cur.connection.commit()
   
    print("Proveedor eliminado exitosamente.")

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
            print("1. Crear proveedor")
            print("2. Leer proveedor")
            print("3. Actualizar proveedor")
            print("4. Eliminar proveedor")
            print("5. Salir")
           
            choice = input("Ingrese su elección (1-5): ")
           
            # Ejecuta la función correspondiente según la elección del usuario
            if choice == '1':
                create_supplier(cur)
            elif choice == '2':
                read_supplier(cur)
            elif choice == '3':
                update_supplier(cur)
            elif choice == '4':
                delete_supplier(cur)
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