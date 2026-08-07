# Architecture & Technical Decisions

La validación de las reglas de estado se encuentran en el backend, justo en el servicio de inmuebles (`PropertyService`). De esta forma, nos aseguramos de que las reglas se cumplan independientemente de la interfaz o cliente que consuma la API.

---

**¿Cómo garantizas que un usuario no pueda modificar recursos ajenos?**

Al modificar (o eliminar) cualquier recurso, el backend hace una búsqueda del recurso en la base de datos filtrando por el `id` del recurso y el `userId` del usuario autenticado. Si no se encuentra el recurso, se devuelve un error `404`, evitando que un usuario pueda modificar recursos que no le pertenecen.

---

**¿Dónde guardas el token en el cliente y qué riesgo asumes?**

Se guarda en una cookie `HttpOnly` gestionada por el backend, la cual se envía automáticamente en cada petición al servidor. Esto evita que el token sea accesible desde JavaScript en el cliente, mitigando riesgos de **XSS**.

El problema es que al enviarse automáticamente en cada petición, si un atacante logra engañar al navegador del usuario para que haga una petición maliciosa (CSRF), el token se enviará automáticamente.

---

**¿Qué deuda técnica asumiste conscientemente por el límite de tiempo?**

Los tests unitarios y el uso de refresh tokens son deudas ausmidas conscientemente por el tiempo. Al igual que la implementación de un sistema de Docker y Swagger
