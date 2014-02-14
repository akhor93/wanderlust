var HandleBars

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

// exports.moduloIf = function(index_count,mod, remainder, block) {
//   if (parseInt(index_count)%(mod) === remainder) return block.fn(this);
// }