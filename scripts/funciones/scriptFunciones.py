import cx_Oracle

# Función para obtener el correo de un cliente
def obtener_correo_cliente(cur):
    id_cliente = int(input('Ingrese el ID del cliente: '))
    result = cur.callfunc('FIDE_CLIENTES_OBTENER_CORREO_FN', cx_Oracle.STRING, [id_cliente])
    print('Correo del cliente:', result)

# Función para obtener el porcentaje de descuento de un cliente
def obtener_porcentaje_descuento(cur):
    id_cliente = int(input('Ingrese el ID del cliente: '))
    result = cur.callfunc('FIDE_CLIENTES_OBTENER_PORCENTAJE_DESCUENTO_FN', cx_Oracle.NUMBER, [id_cliente])
    print('Porcentaje de descuento del cliente:', result)

# Función para obtener el total de órdenes de un cliente
def obtener_total_ordenes_cliente(cur):
    id_cliente = int(input('Ingrese el ID del cliente: '))
    result = cur.callfunc('FIDE_CLIENTES_OBTENER_TOTAL_ORDENES_FN', cx_Oracle.NUMBER, [id_cliente])
    print('Total de órdenes del cliente:', result)

# Función para calcular el monto de descuento
def calcular_monto_descuento(cur):
    id_descuento = int(input('Ingrese el ID del descuento: '))
    subtotal = float(input('Ingrese el subtotal: '))
    result = cur.callfunc('FIDE_DESCUENTOS_CALCULAR_MONTO_FN', cx_Oracle.NUMBER, [id_descuento, subtotal])
    print('Monto del descuento:', result)

# Función para verificar la disponibilidad de un producto
def verificar_disponibilidad_producto(cur):
    id_producto = int(input('Ingrese el ID del producto: '))
    result = cur.callfunc('FIDE_PRODUCTOS_CHECK_DISPONIBILIDAD_FN', cx_Oracle.STRING, [id_producto])
    print('Disponibilidad del producto:', result)

# Función para obtener el precio de un producto
def obtener_precio_producto(cur):
    id_producto = int(input('Ingrese el ID del producto: '))
    result = cur.callfunc('FIDE_PRODUCTOS_OBTENER_PRECIO_FN', cx_Oracle.NUMBER, [id_producto])
    print('Precio del producto:', result)

# Función para obtener la información de contacto de un proveedor
def obtener_contacto_proveedor(cur):
    id_proveedor = int(input('Ingrese el ID del proveedor: '))
    result = cur.callfunc('FIDE_PROVEEDORES_OBTENER_CONTACTO_FN', cx_Oracle.STRING, [id_proveedor])
    print('Información de contacto del proveedor:', result)

# Función para obtener el total de ventas de un producto
def obtener_total_ventas_producto(cur):
    id_producto = int(input('Ingrese el ID del producto: '))
    result = cur.callfunc('FIDE_VENTAS_OBTENER_TOTAL_VENTAS_FN', cx_Oracle.NUMBER, [id_producto])
    print('Total de ventas del producto:', result)

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
            print("\nOpciones:")
            print("1. Obtener correo de cliente")
            print("2. Obtener porcentaje de descuento de cliente")
            print("3. Obtener total de órdenes de cliente")
            print("4. Calcular monto de descuento")
            print("5. Verificar disponibilidad de producto")
            print("6. Obtener precio de producto")
            print("7. Obtener contacto de proveedor")
            print("8. Obtener total de ventas de producto")
            print("9. Salir")
           
            choice = input("Seleccione una opción (1-9): ")
            
            # Ejecuta la función correspondiente según la elección del usuario
            if choice == '1':
                obtener_correo_cliente(cur)
            elif choice == '2':
                obtener_porcentaje_descuento(cur)
            elif choice == '3':
                obtener_total_ordenes_cliente(cur)
            elif choice == '4':
                calcular_monto_descuento(cur)
            elif choice == '5':
                verificar_disponibilidad_producto(cur)
            elif choice == '6':
                obtener_precio_producto(cur)
            elif choice == '7':
                obtener_contacto_proveedor(cur)
            elif choice == '8':
                obtener_total_ventas_producto(cur)
            elif choice == '9':
                break
            else:
                print("Opción no válida. Por favor, intente de nuevo.")
    except Exception as err:
        print('Error al ejecutar la función:', err)
    finally:
        cur.close()
finally:
    conn.close()