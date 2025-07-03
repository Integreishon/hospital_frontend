#!/bin/bash
# 🚀 Script de Configuración para Integración Mercado Pago

echo "🚀 Configurando integración de Mercado Pago..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Ejecuta este script desde el directorio del frontend."
    exit 1
fi

print_info "🔍 Verificando dependencias..."

# 1. Verificar e instalar dependencias de Mercado Pago
if npm list @mercadopago/sdk-react &> /dev/null; then
    print_status "SDK de Mercado Pago ya está instalado"
else
    print_info "Instalando SDK de Mercado Pago..."
    npm install @mercadopago/sdk-react
    print_status "SDK de Mercado Pago instalado"
fi

# 2. Verificar React Router
if npm list react-router-dom &> /dev/null; then
    print_status "React Router ya está instalado"
else
    print_info "Instalando React Router..."
    npm install react-router-dom
    print_status "React Router instalado"
fi

# 3. Verificar Heroicons
if npm list @heroicons/react &> /dev/null; then
    print_status "Heroicons ya está instalado"
else
    print_info "Instalando Heroicons..."
    npm install @heroicons/react
    print_status "Heroicons instalado"
fi

print_info "📁 Verificando estructura de archivos..."

# 4. Verificar que las páginas de pago existen
if [ ! -f "src/pages/payment/PaymentSuccess.jsx" ]; then
    print_error "Falta: src/pages/payment/PaymentSuccess.jsx"
else
    print_status "PaymentSuccess.jsx encontrado"
fi

if [ ! -f "src/pages/payment/PaymentFailure.jsx" ]; then
    print_error "Falta: src/pages/payment/PaymentFailure.jsx"
else
    print_status "PaymentFailure.jsx encontrado"
fi

if [ ! -f "src/pages/payment/PaymentPending.jsx" ]; then
    print_error "Falta: src/pages/payment/PaymentPending.jsx"
else
    print_status "PaymentPending.jsx encontrado"
fi

# 5. Verificar componente MercadoPago
if [ ! -f "src/components/features/payments/MercadoPagoCheckout.jsx" ]; then
    print_error "Falta: src/components/features/payments/MercadoPagoCheckout.jsx"
else
    print_status "MercadoPagoCheckout.jsx encontrado"
fi

# 6. Verificar archivo de tarjetas de prueba
if [ ! -f "TARJETAS_PRUEBA.md" ]; then
    print_warning "Falta: TARJETAS_PRUEBA.md"
else
    print_status "TARJETAS_PRUEBA.md encontrado"
fi

print_info "🔧 Verificando configuración del backend..."

# 7. Verificar configuración del backend
BACKEND_DIR="../Api_SprintBoot"
if [ -d "$BACKEND_DIR" ]; then
    print_status "Directorio del backend encontrado"
    
    if [ -f "$BACKEND_DIR/src/main/resources/application.properties" ]; then
        if grep -q "mercadopago.access-token" "$BACKEND_DIR/src/main/resources/application.properties"; then
            print_status "Configuración de Mercado Pago encontrada en application.properties"
        else
            print_warning "Falta configuración de Mercado Pago en application.properties"
        fi
    else
        print_warning "Archivo application.properties no encontrado"
    fi
else
    print_warning "Directorio del backend no encontrado en $BACKEND_DIR"
fi

print_info "🌐 Verificando URLs y configuración..."

# 8. Mostrar URLs importantes
echo
print_info "URLs importantes para pruebas:"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:8080/api"
echo "Swagger: http://localhost:8080/api/swagger-ui.html"
echo
echo "URLs de retorno de Mercado Pago:"
echo "✅ Éxito: http://localhost:5173/payment/success"
echo "❌ Error: http://localhost:5173/payment/failure"
echo "⏳ Pendiente: http://localhost:5173/payment/pending"
echo

print_info "🧪 Tarjetas de prueba principales:"
echo "VISA Aprobada: 4013 5406 8274 6260 | CVV: 123 | Vence: 11/25 | Nombre: APRO"
echo "VISA Rechazada: 4013 5406 8274 6260 | CVV: 123 | Vence: 11/25 | Nombre: OTHE"
echo "VISA Pendiente: 4013 5406 8274 6260 | CVV: 123 | Vence: 11/25 | Nombre: CONT"
echo

print_info "📋 Pasos para probar:"
echo "1. Ejecutar backend: cd ../Api_SprintBoot && ./mvnw spring-boot:run"
echo "2. Ejecutar frontend: npm run dev"
echo "3. Abrir: http://localhost:5173"
echo "4. Crear/seleccionar una cita"
echo "5. Ir al proceso de pago"
echo "6. Usar tarjetas de prueba de TARJETAS_PRUEBA.md"
echo

# 9. Verificar si los servicios están ejecutándose
print_info "🔍 Verificando servicios..."

# Verificar si el backend está ejecutándose
if curl -s http://localhost:8080/api/actuator/health >/dev/null 2>&1; then
    print_status "Backend ejecutándose en puerto 8080"
else
    print_warning "Backend no está ejecutándose en puerto 8080"
fi

# Verificar si el frontend está ejecutándose
if curl -s http://localhost:5173 >/dev/null 2>&1; then
    print_status "Frontend ejecutándose en puerto 5173"
else
    print_warning "Frontend no está ejecutándose en puerto 5173"
fi

echo
print_status "🎉 Verificación completada!"
echo
print_info "💡 Consejos importantes:"
echo "• Usar solo datos de prueba proporcionados"
echo "• Deshabilitar ad-blockers si hay problemas"
echo "• Revisar logs de consola para debug"
echo "• Todas las transacciones son simuladas (sandbox)"
echo
print_status "¡Todo listo para probar Mercado Pago! 🚀"