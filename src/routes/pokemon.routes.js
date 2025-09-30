const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon.controller');
const { validatePokemon, validateId } = require('../middlewares/validation.middleware');

/**
 * @swagger
 * tags:
 *   name: Pokemon
 *   description: Pokemon management endpoints
 */

/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     summary: Get all Pokemon
 *     tags: [Pokemon]
 *     description: Retrieve a paginated list of all Pokemon
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number (default 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of items per page (default 20, max 100)
 *         example: 20
 *     responses:
 *       200:
 *         description: List of Pokemon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     pokemon:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Pokemon'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         itemsPerPage:
 *                           type: integer
 *                           example: 20
 *                         totalItems:
 *                           type: integer
 *                           example: 200
 *                         totalPages:
 *                           type: integer
 *                           example: 10
 *                         hasNextPage:
 *                           type: boolean
 *                           example: true
 *                         hasPreviousPage:
 *                           type: boolean
 *                           example: false
 *                 message:
 *                   type: string
 *                   example: Pokemon retrieved successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', pokemonController.getAll);

/**
 * @swagger
 * /api/pokemon/{id}:
 *   get:
 *     summary: Get a Pokemon by ID
 *     tags: [Pokemon]
 *     description: Retrieve a specific Pokemon by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pokemon ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Pokemon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Pokemon'
 *                 message:
 *                   type: string
 *                   example: Pokemon retrieved successfully
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateId, pokemonController.getById);

/**
 * @swagger
 * /api/pokemon:
 *   post:
 *     summary: Create a new Pokemon
 *     tags: [Pokemon]
 *     description: Create a new Pokemon with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 example: Charizard
 *               type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Fire", "Flying"]
 *               hp:
 *                 type: integer
 *                 example: 78
 *               attack:
 *                 type: integer
 *                 example: 84
 *               defense:
 *                 type: integer
 *                 example: 78
 *               speed:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Pokemon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Pokemon'
 *                 message:
 *                   type: string
 *                   example: Pokemon created successfully
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validatePokemon, pokemonController.create);

/**
 * @swagger
 * /api/pokemon/{id}:
 *   put:
 *     summary: Update a Pokemon
 *     tags: [Pokemon]
 *     description: Update an existing Pokemon by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pokemon ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pikachu
 *               type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Electric"]
 *               hp:
 *                 type: integer
 *                 example: 35
 *               attack:
 *                 type: integer
 *                 example: 55
 *               defense:
 *                 type: integer
 *                 example: 40
 *               speed:
 *                 type: integer
 *                 example: 90
 *     responses:
 *       200:
 *         description: Pokemon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Pokemon'
 *                 message:
 *                   type: string
 *                   example: Pokemon updated successfully
 *       400:
 *         description: Invalid input data or ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateId, pokemonController.update);

/**
 * @swagger
 * /api/pokemon/{id}:
 *   delete:
 *     summary: Delete a Pokemon
 *     tags: [Pokemon]
 *     description: Delete a Pokemon by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pokemon ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Pokemon deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Pokemon deleted successfully
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateId, pokemonController.remove);

module.exports = router;
