const { z } = require('zod');

const schUser = z.object({
    id: z.string(),
    name: z.string(),
    lastname: z.string(),
    email: z.string().email()
});

module.exports = schUser;