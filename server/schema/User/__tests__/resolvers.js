import resolver from '../resolvers';

it('ID resolver should return an INT', 
  expect(
    resolver.id({id: '2'})
  )
  .toBe(2)
)