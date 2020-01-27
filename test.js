const twoCats = [ 'Louis', 'SpySpy' ];
Promise.all(
  twoCats.map(cat => api('reverse', { cat: cat }))
).then(reversed => {
  console.log(reversed);
  // hits the rate limit
  const threeCats = [ 'Louis', 'SpySpy', 'Sammy' ];
  return Promise.all( 
    threeCats.map(cat => api('reverse', { cat: cat }))
  );
}).then(reversed > {
  console.log(reversed);
});

