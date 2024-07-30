import cx_Oracle
from datetime import datetime

# Función para crear un nuevo tipo de descuento en la base de datos
def create_discount_type(cur):
    # Recopila información del usuario para el nuevo tipo de descuento
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento: "))
    id_cliente = int(input("Ingrese el ID del cliente: "))
    id_estado = int(input("Ingrese el ID del estado: "))
    porcentaje_descuento = float(input("Ingrese el porcentaje de descuento: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
   
    # Llama al procedimiento almacenado para crear el tipo de descuento
    cur.callproc("FIDE_TIPO_DESCUENTO_CREATE_SP", [id_tipo_descuento, id_cliente, id_estado, porcentaje_descuento,
                                                   creado_por, fecha_creacion, accion])
    cur.connection.commit()
   
    print("Tipo de descuento creado exitosamente.")

# Función para leer información de un tipo de descuento existente
def read_discount_type(cur):
    # Solicita el ID del tipo de descuento a consultar
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento a consultar: "))
   
    # Ejecuta el procedimiento almacenado para leer el tipo de descuento
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_TIPO_DESCUENTO_READ_SP", [id_tipo_descuento, result])
   
    # Imprime los resultados
    for row in result.getvalue():
        print(row)

# Función para actualizar un tipo de descuento existente
def update_discount_type(cur):
    # Recopila información actualizada del usuario
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento a actualizar: "))
    id_cliente = int(input("Ingrese el nuevo ID del cliente: "))
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    porcentaje_descuento = float(input("Ingrese el nuevo porcentaje de descuento: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
   
    # Llama al procedimiento almacenado para actualizar el tipo de descuento
    cur.callproc("FIDE_TIPO_DESCUENTO_UPDATE_SP", [id_tipo_descuento, id_cliente, id_estado, porcentaje_descuento,
                                                   modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
   
    print("Tipo de descuento actualizado exitosamente.")

# Función para eliminar un tipo de descuento
def delete_discount_type(cur):
    # Solicita el ID del tipo de descuento a eliminar
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento a eliminar: "))
   
    # Llama al procedimiento almacenado para eliminar el tipo de descuento
    cur.callproc("FIDE_TIPO_DESCUENTO_DELETE_SP", [id_tipo_descuento])
    cur.connection.commit()
   
    print("Tipo de descuento eliminado exitosamente.")

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
            print("1. Crear tipo de descuento")
            print("2. Leer tipo de descuento")
            print("3. Actualizar tipo de descuento")
            print("4. Eliminar tipo de descuento")
            print("5. Salir")
           
            choice = input("Ingrese su elección (1-5): ")
           
            # Ejecuta la función correspondiente según la elección del usuario
            if choice == '1':
                create_discount_type(cur)
            elif choice == '2':
                read_discount_type(cur)
            elif choice == '3':
                update_discount_type(cur)
            elif choice == '4':
                delete_discount_type(cur)
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