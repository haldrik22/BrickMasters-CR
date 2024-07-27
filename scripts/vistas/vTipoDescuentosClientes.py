import cx_Oracle

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM FIDE_TIPO_DESCUENTOS_CLIENTES_V')
        rows = cur.fetchall()

        # Print column names
        column_names = [col[0] for col in cur.description]
        print("Columnas: ", ", ".join(column_names))
        print("-" * 80)

        for row in rows:
            print(row)
    except Exception as err:
        print('Error al ejecutar la consulta:', err)
    finally:
        cur.close()
finally:
    conn.close()