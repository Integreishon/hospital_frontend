# 🚀 Integración Mercado Pago - Configuración Completa

## ✅ ¿Qué se ha configurado?

### **Frontend (React)**
1. ✅ **Componente MercadoPagoCheckout.jsx** - Mejorado con:
   - Inicialización única del SDK
   - Manejo de errores mejorado
   - Configuración actualizada (sin deprecaciones)
   - URLs de fallback
   - Debug información
   - Retry automático

2. ✅ **Páginas de retorno de pago:**
   - `/payment/success` - Pago exitoso
   - `/payment/failure` - Pago fallido  
   - `/payment/pending` - Pago pendiente

3. ✅ **Rutas configuradas** en App.jsx
4. ✅ **Servicio mejorado** con mejor manejo de errores

### **Backend (Spring Boot)**
1. ✅ **Credenciales actualizadas** en application.properties
2. ✅ **Endpoints funcionales:**
   - `POST /api/payments/mercadopago/create-preference`
   - `POST /api/payments/mercadopago/webhook`
   - `GET /api/payments/mercadopago/validate-config`

3. ✅ **URLs de retorno configuradas**
4. ✅ **CORS habilitado** para localhost:5173

## 🧪 **Cómo Probar**

### **1. Iniciar Servicios**
```bash
# Terminal 1 - Backend
cd Api_SprintBoot
./mvnw spring-boot:run

# Terminal 2 - Frontend  
cd hospital_frontend
npm run dev
```

### **2. Abrir Aplicación**
- Ir a: http://localhost:5173
- Loguearse como paciente
- Crear o seleccionar una cita
- Ir al proceso de pago

### **3. Usar Tarjetas de Prueba**

**✅ PAGO EXITOSO:**
```
Tarjeta: 4013 5406 8274 6260
CVV: 123
Vencimiento: 11/25  
Nombre: APRO
DNI: 12345678
```

**❌ PAGO RECHAZADO:**
```
Tarjeta: 4013 5406 8274 6260
CVV: 123
Vencimiento: 11/25
Nombre: OTHE
DNI: 12345678
```

**⏳ PAGO PENDIENTE:**
```
Tarjeta: 4013 5406 8274 6260
CVV: 123
Vencimiento: 11/25
Nombre: CONT
DNI: 12345678
```

### **4. Verificar Resultados**
- **Éxito:** Redirección a `/payment/success`
- **Error:** Redirección a `/payment/failure`
- **Pendiente:** Redirección a `/payment/pending`

## 🔧 **Configuración Técnica**

### **Credenciales (Sandbox)**
```
PUBLIC_KEY: TEST-14097700-6b59-4c65-b705-a42a232990e7
ACCESS_TOKEN: TEST-2137439444-070325-177af2d5626de56bcd3c24889dd8ec4b-2107140326
```

### **URLs Configuradas**
```
Frontend: http://localhost:5173
Backend: http://localhost:8080/api
Success: http://localhost:5173/payment/success?appointment_id={id}
Failure: http://localhost:5173/payment/failure?appointment_id={id}  
Pending: http://localhost:5173/payment/pending?appointment_id={id}
```

## 🚨 **Solución de Problemas**

### **Error: "Widget no carga"**
1. Verificar Public Key en consola
2. Revisar errores de red (ad-blockers)
3. Confirmar que preference ID es válido

### **Error: "blocked by client"**  
1. Deshabilitar ad-blockers
2. Revisar configuración CORS
3. Usar Chrome/Firefox en modo incógnito

### **Error: "Preference creation failed"**
1. Verificar backend ejecutándose
2. Revisar credenciales en application.properties
3. Comprobar logs del backend

### **URLs de retorno no funcionan**
1. Verificar rutas en App.jsx
2. Confirmar que las páginas existen
3. Revisar React Router configuración

## 🔍 **Endpoints de Debug**

### **Validar Configuración**
```bash
curl http://localhost:8080/api/payments/mercadopago/validate-config
```

### **Diagnóstico de Cita**
```bash
curl http://localhost:8080/api/payments/mercadopago/diagnose/{appointmentId}
```

### **Crear Preferencia de Prueba**
```bash
curl -X POST http://localhost:8080/api/payments/mercadopago/test-preference
```

## 📁 **Archivos Creados/Modificados**

### **Frontend:**
- `src/components/features/payments/MercadoPagoCheckout.jsx` ✅
- `src/pages/payment/PaymentSuccess.jsx` ✅
- `src/pages/payment/PaymentFailure.jsx` ✅  
- `src/pages/payment/PaymentPending.jsx` ✅
- `src/App.jsx` (rutas añadidas) ✅
- `src/services/appointmentService.js` (mejorado) ✅
- `TARJETAS_PRUEBA.md` ✅

### **Backend:**
- `src/main/resources/application.properties` (credenciales) ✅
- Servicios y controladores ya existían ✅

## 🎯 **Próximos Pasos**

1. **✅ Probar flujo completo** con tarjetas de prueba
2. **✅ Verificar redirecciones** funcionan correctamente  
3. **✅ Comprobar estados de cita** se actualizan
4. **📧 Configurar emails** de confirmación (opcional)
5. **🔒 Migrar a producción** cuando esté listo

## 💡 **Notas Importantes**

- **🧪 Sandbox:** Todas las transacciones son simuladas
- **💳 Solo datos de prueba:** No usar tarjetas reales
- **🔒 Seguro:** Mercado Pago maneja datos sensibles
- **📱 Responsive:** Funciona en móvil y desktop
- **🌐 CORS:** Configurado para desarrollo local

---

**¡Tu integración de Mercado Pago está lista! 🎉**

Si tienes problemas, revisa:
1. Logs de consola del navegador
2. Logs del backend
3. Archivo `TARJETAS_PRUEBA.md` 
4. Este README para troubleshooting

# Configuración de Mercado Pago para Pruebas

Este documento explica cómo configurar correctamente Mercado Pago para pruebas y solucionar errores comunes.

## Configuración de Usuarios de Prueba

Para probar correctamente los pagos con Mercado Pago en el entorno de sandbox, debes crear y usar usuarios de prueba específicos.

### 1. Crear Usuarios de Prueba

1. Inicia sesión en tu cuenta de [Mercado Pago Developers](https://developers.mercadopago.com/)
2. Ve a la sección "Pruebas" > "Usuarios de prueba"
3. Crea dos usuarios de prueba:
   - Un usuario **Vendedor** (para recibir pagos)
   - Un usuario **Comprador** (para realizar pagos)

### 2. Configurar las Credenciales del Vendedor

1. Inicia sesión con el usuario **Vendedor** en [Mercado Pago Developers](https://developers.mercadopago.com/)
2. Ve a "Credenciales" y copia las credenciales de prueba (TEST):
   - Public Key
   - Access Token
3. Actualiza estas credenciales en el archivo `application.properties` del backend:

```properties
mercadopago.public-key=TEST-tu-public-key
mercadopago.access-token=TEST-tu-access-token
```

### 3. Usar el Usuario Comprador para Pagos

Al realizar pagos de prueba, **debes usar el email del usuario Comprador** que creaste. Si usas otro email, recibirás el error `Invalid users involved`.

## Tarjetas de Prueba

Usa estas tarjetas para probar diferentes escenarios:

| Tarjeta           | Número                | CVV | Fecha | Resultado |
|-------------------|------------------------|-----|-------|-----------|
| Mastercard        | 5031 7557 3453 0604   | 123 | 11/25 | APROBADO  |
| Visa              | 4509 9535 6623 3704   | 123 | 11/25 | APROBADO  |
| American Express  | 3711 803032 57522     | 1234| 11/25 | APROBADO  |
| Mastercard        | 5031 1111 1111 1111   | 123 | 11/25 | RECHAZADO |
| Visa              | 4444 4444 4444 0004   | 123 | 11/25 | RECHAZADO |

## Solución de Problemas

### Error: "Invalid users involved"

Este error ocurre cuando:

1. No estás usando un usuario de prueba creado correctamente
2. El email del comprador no corresponde a un usuario de prueba
3. Las credenciales del vendedor no están actualizadas

**Solución:**
- Verifica que estás usando el email del usuario Comprador de prueba
- Asegúrate de que las credenciales en `application.properties` corresponden al usuario Vendedor
- Crea nuevos usuarios de prueba si los actuales no funcionan

### Error: "The following payment type(s) are not allowed at your site"

Este es solo un mensaje informativo que no afecta la funcionalidad. Indica que algunos métodos de pago no están habilitados en tu cuenta de prueba.

## Documentación Oficial

- [Crear usuarios de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/additional-content/your-integrations/test/test-users)
- [Tarjetas de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/additional-content/your-integrations/test/cards)
- [Checkout Bricks](https://www.mercadopago.com.ar/developers/es/docs/checkout-bricks/payment-brick/introduction)