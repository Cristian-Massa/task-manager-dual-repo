/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la tarea
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: Título de la tarea
 *                     example: Hacer la tarea
 *                   completed:
 *                     type: boolean
 *                     description: Estado actual de la tarea
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación de la tarea
 *                     example: "2024-12-29T12:34:56.000Z"
 *       404:
 *         description: Devuelve un error cuando no se encuentra la tarea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Devuelve un error en formato string para ser consumido directamente en el frontend
 *                   example: "Tasks not found"
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene información detallada de una tarea específica
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *           example: "60c72b2f9d1e8f1b2d3f1c4d"
 *     responses:
 *       200:
 *         description: Información detallada de la tarea obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la tarea
 *                   example: "60c72b2f9d1e8f1b2d3f1c4d"
 *                 title:
 *                   type: string
 *                   description: Título de la tarea
 *                   example: "Completar proyecto de API"
 *                 description:
 *                   type: string
 *                   description: Descripción detallada de la tarea
 *                   example: "Desarrollar un nuevo endpoint para registrar usuarios."
 *                 completed:
 *                   type: boolean
 *                   description: Estado de la tarea
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la tarea
 *                   example: "2024-12-29T12:34:56.000Z"
 *       400:
 *         description: El ID es no puede convertirse a mongoId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Devuelve el error al ingresar un ID inválido o mal formado
 *                   example: "Id is invalid"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Devuelve el error cuando no se encuentra la tarea con el ID especificado
 *                   example: "Task not found"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea específica por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea que se desea eliminar
 *         schema:
 *           type: string
 *           example: "60c72b2f9d1e8f1b2d3f1c4d"
 *     responses:
 *       200:
 *         description: La tarea fue eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de la eliminación
 *                   example: "Task deleted"
 *       400:
 *         description: El ID es requerido o está mal formado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error cuando el ID no es válido
 *                   example: "Id is required"  # Corregido el ejemplo
 *       404:
 *         description: No se encontró la tarea con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error cuando no se encuentra la tarea
 *                   example: "Task not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error cuando ocurre un fallo interno
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Completar proyecto API"
 *               description:
 *                 type: string
 *                 description: Descripción detallada de la tarea
 *                 example: "Desarrollar un nuevo endpoint para registrar usuarios."
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la tarea recién creada
 *                   example: "60c72b2f9d1e8f1b2d3f1c4d"
 *                 title:
 *                   type: string
 *                   description: Título de la tarea
 *                   example: "Completar proyecto API"
 *                 description:
 *                   type: string
 *                   description: Descripción detallada de la tarea
 *                   example: "Desarrollar un nuevo endpoint para registrar usuarios."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la tarea
 *                   example: "2024-12-29T12:34:56.000Z"
 *       400:
 *         description: Error al crear la tarea (por ejemplo, si falta el título)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error cuando la tarea no se puede crear
 *                   example: "Title is required"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error para fallos en el servidor
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *           example: "60c72b2f9d1e8f1b2d3f1c4d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Tarea actualizada"
 *               description:
 *                 type: string
 *                 description: Descripción actualizada de la tarea
 *                 example: "Descripción modificada."
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la tarea actualizada
 *                   example: "60c72b2f9d1e8f1b2d3f1c4d"
 *                 title:
 *                   type: string
 *                   description: Título de la tarea
 *                   example: "Tarea actualizada"
 *       400:
 *         description: Error al actualizar la tarea (por ejemplo, ID inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error al proporcionar un ID inválido
 *                   example: "Id is invalid"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error cuando no se encuentra la tarea
 *                   example: "Task not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error cuando ocurre un fallo interno
 *                   example: "Internal server error"
 */
