const { z } = require('zod');

const schChar = z.object({
    id: z.string(),
    name: z.string(),
    level: z.number(),
    type: z.string(),
    userid: z.string(),
});

module.exports = schChar;