const Chance = require('chance')
const chance = new Chance()

const { abilities, featureTypes, featureTypeValues, relationshipTypes } = require('./enums')

var IdentitySchema = () => ({
    name : chance.hashtag(),
    type: chance.weighted(['normal', 'supernatural'], [10, 1]),
    grants: chance.word(),
    percent : chance.integer({min: 15, max: 99}),
    description : chance.sentence(),
    ofCourse : chance.n(chance.word, chance.integer({min: 1, max: 4})).join(', '),
    substitutes : abilities[chance.integer({min: 0, max: abilities.length - 1})],
    features : chance.n(
        () => {
            const type = featureTypes[chance.integer({min: 0, max: featureTypes.length - 1})]
            const value = featureTypeValues[type](chance)
            return { type, value }
        },
        2
    )
})

var RelationshipSchema = type => ({
    type,
    percent : chance.integer({min: 1, max: 99}),
    target : chance.name()
})

var CharacterSchema = () => {
    const firstName = chance.first()
    const lastName = chance.last()
    const middleName = chance.last()
    const nickname = chance.twitter()
    const streetName = chance.weighted(['', `the ${chance.animal()}`], [8, 2])
    return ({
        bio : {
          firstName,
          lastName,
          middleName,
          nickname,
          streetName,
          name: `${firstName} ${nickname ? '"' + nickname + '" ' : ' '}${middleName} ${lastName}${streetName ? ' aka "' + streetName + '"' : ''}`,
          cabal : chance.weighted([null, chance.company], [7, 3]),
          objective : chance.sentence(),
          characteristics : chance.n(chance.word, chance.integer({min: 1, max: 3})).join(', '),
          history : chance.paragraph(),
          obsession : chance.sentence({words: chance.integer({min: 1, max: 6})}),
          passions : {
              fear : chance.sentence({words: chance.integer({min: 1, max: 4})}),
              rage : chance.sentence({words: chance.integer({min: 1, max: 4})}),
              noble : chance.sentence({words: chance.integer({min: 1, max: 4})})
          }
        },
        madness : chance.n(
            () => ({
                type: chance.domain(),
                origin: chance.sentence({words: chance.integer({min: 1, max: 6})})
            }), 
            chance.integer({min: 0, max: 3})
        ),
        meters : {
            helplessness : {
                hardened : chance.integer({min: 0, max: 10}),
                failed : chance.integer({min: 0, max: 5})
            },
            isolation : {
                hardened : chance.integer({min: 0, max: 10}),
                failed : chance.integer({min: 0, max: 5})
            },
            "self" : {
                hardened : chance.integer({min: 0, max: 10}),
                failed : chance.integer({min: 0, max: 5})
            },
            unnatural : {
                hardened : chance.integer({min: 0, max: 10}),
                failed : chance.integer({min: 0, max: 5})
            },
            violence : {
                hardened : chance.integer({min: 0, max: 10}),
                failed : chance.integer({min: 0, max: 5})
            }
        },
        identities : chance.n(IdentitySchema, chance.integer({min: 1, max: 5})),
        relationships : relationshipTypes.map(type => RelationshipSchema(type)) ,
        wounds : {
              threshold : 50,
              list : chance.n(
                  () => ({
                    origin: chance.sentence({words: chance.integer({min: 1, max: 6})}),
                    amount: chance.integer({min: 1, max: 10})
                  }),
                  chance.integer({min: 0, max: 10})
              )
        },
      //   supernatural : [ new Schema({any: Object}) ],
      //   inventory : [ new Schema({any:Object}) ]
      })
}

module.exports = CharacterSchema()