# 🧪 Tarjetas de Prueba - Mercado Pago Perú

## 📳 Tarjetas de Crédito/Débito

### ✅ **Pagos Aprobados**
```
VISA
Número: 4013 5406 8274 6260
CVV: 123
Fecha: 11/25
Nombre: APRO

VISA 
Número: 4509 9535 6623 3704
CVV: 123  
Fecha: 11/25
Nombre: APRO

MASTERCARD
Número: 5031 7557 3453 0604
CVV: 123
Fecha: 11/25  
Nombre: APRO

MASTERCARD
Número: 5254 1336 7440 3564
CVV: 123
Fecha: 11/25
Nombre: APRO
```

### ❌ **Pagos Rechazados**
```
VISA (Fondos Insuficientes)
Número: 4170 0688 1010 8020
CVV: 123
Fecha: 11/25
Nombre: OTHE

VISA (Rechazado) 
Número: 4013 5406 8274 6260
CVV: 123
Fecha: 11/25
Nombre: OTHE

MASTERCARD (Rechazado)
Número: 5031 7557 3453 0604  
CVV: 123
Fecha: 11/25
Nombre: OTHE
```

### ⏳ **Pagos Pendientes**
```
VISA (Pendiente)
Número: 4013 5406 8274 6260
CVV: 123  
Fecha: 11/25
Nombre: CONT

MASTERCARD (Pendiente)
Número: 5031 7557 3453 0604
CVV: 123
Fecha: 11/25  
Nombre: CONT
```

## 🆔 Documentos de Identidad para Pruebas

```
DNI: 12345678
Nombre: Juan
Apellido: Pérez  
Email: test_user_123456@testuser.com

DNI: 87654321
Nombre: María
Apellido: González
Email: test_user_789012@testuser.com
```

## 🔧 Configuración de Usuario de Prueba

### **Credenciales para Pruebas**
```
PUBLIC_KEY: TEST-14097700-6b59-4c65-b705-a42a232990e7
ACCESS_TOKEN: TEST-2137439444-070325-177af2d5626de56bcd3c24889dd8ec4b-2107140326

Usuario de Prueba:
Email: test_user_123456@testuser.com
Password: qatest123
```

## 🎯 Escenarios de Prueba Recomendados

### **1. Flujo Completo Exitoso**
1. Usar tarjeta VISA 4013 5406 8274 6260 con nombre "APRO"
2. Completar datos con DNI 12345678
3. Verificar redirección a `/payment/success`
4. Confirmar que la cita cambia de estado

### **2. Pago Rechazado**  
1. Usar misma tarjeta VISA pero con nombre "OTHE"
2. Verificar redirección a `/payment/failure`
3. Permitir reintentar el pago

### **3. Pago Pendiente**
1. Usar tarjeta VISA con nombre "CONT" 
2. Verificar redirección a `/payment/pending`
3. Simular confirmación posterior

## 🌐 URLs de Entorno

```bash
# Sandbox
https://www.mercadopago.com.pe/developers/panel/applications

# URLs de Prueba  
Frontend: http://localhost:5173
Backend: http://localhost:8080/api
Webhook: http://localhost:8080/api/payments/mercadopago/webhook
```

## 📋 Checklist de Verificación

- [ ] Public Key configurada correctamente
- [ ] Access Token configurado en backend  
- [ ] CORS habilitado para localhost:5173
- [ ] URLs de retorno funcionando
- [ ] Webhook endpoint accesible
- [ ] Tarjetas de prueba funcionando
- [ ] Redirecciones correctas después del pago
- [ ] Estados de cita actualizándose
- [ ] Emails/notificaciones enviándose

## 🚨 Problemas Comunes

### **Error: "blocked by client"**
- Deshabilitar ad-blockers
- Verificar configuración de CORS
- Revisar CSP headers

### **Widget no carga**
- Verificar Public Key
- Revisar console para errores de SDK
- Confirmar que preference ID es válido

### **Redirección no funciona**
- Verificar URLs en backend
- Confirmar rutas en React Router
- Revisar parámetros de query

### **Webhook no recibe notificaciones**
- Solo funciona en producción/ngrok
- En desarrollo usar polling manual
- Verificar endpoint público

## 🔄 Pasos para Probar

1. **Iniciar Backend:**
   ```bash
   cd ../Api_SprintBoot
   ./mvnw spring-boot:run
   ```

2. **Iniciar Frontend:**
   ```bash
   cd hospital_frontend
   npm run dev
   ```

3. **Acceder a la aplicación:**
   - Abrir: http://localhost:5173
   - Crear/seleccionar una cita
   - Ir al proceso de pago
   - Usar tarjetas de prueba

4. **Verificar URLs de retorno:**
   - Éxito: http://localhost:5173/payment/success
   - Error: http://localhost:5173/payment/failure  
   - Pendiente: http://localhost:5173/payment/pending

## 💡 Tips Adicionales

- **Modo Sandbox:** Todas las transacciones son simuladas
- **No usar datos reales:** Solo usar datos de prueba proporcionados
- **Revisar logs:** Tanto frontend como backend tienen logs detallados
- **Deshabilitar bloqueadores:** Algunos ad-blockers interfieren con MP
- **Usar HTTPS en producción:** Para webhooks funcionales

¡Todo listo para probar Mercado Pago! 🚀