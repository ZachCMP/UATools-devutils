const abilities = [
    'fitness',
    'status',
    'knowledge',
    'notice',
    'connect',
    'dodge',
    'pursuit',
    'lie',
    'secrecy',
    'struggle'
]

const meters = [
    'helplessness',
    'isolation',
    'self',
    'unnatural',
    'violence'
]

const featureTypes = [
    'castsRituals',
    'coercesMeter',
    'evaluatesMeter',
    'medical',
    'firearms',
    'providesWoundThreshold',
    'providesInitiative',
    'resistMeter',
    'therapeutic',
    'unique',
    'gutterMagick',
]

const featureTypeValues = {
    'castsRituals': () => null,
    'coercesMeter': chance => meters[chance.integer({min: 0, max: meters.length - 1})],
    'evaluatesMeter': chance => meters[chance.integer({min: 0, max: meters.length - 1})],
    'medical': () => null,
    'firearms': () => null,
    'providesWoundThreshold': () => null,
    'providesInitiative': () => null,
    'resistMeter': chance => meters[chance.integer({min: 0, max: meters.length - 1})],
    'therapeutic': () => null,
    'unique': chance => chance.sentence({words: 4}),
    'gutterMagick': () => null,
}

relationshipTypes = [
    'favorite',
    'guru',
    'mentor',
    'responsibility',
    'protege'
]

module.exports = {
    abilities,
    meters,
    featureTypes,
    featureTypeValues,
    relationshipTypes,
}