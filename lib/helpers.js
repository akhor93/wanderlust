exports.for = function(from, to, incr, block) {
	var accum = '';
  for(var i = from; i < to; i += incr) accum += block.fn(i);
  return accum;
}

exports.times = function(n, block) {
	var accum = '';
  for(var i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
}