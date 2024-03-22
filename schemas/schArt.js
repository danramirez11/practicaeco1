const { z } = require('zod');

const schArt = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    mod: z.string(),
    charid: z.string(),
});

module.exports = schArt;