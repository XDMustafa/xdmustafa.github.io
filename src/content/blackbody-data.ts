export const C2 = 1.4388e4; // μm·K

/** Table 1 of the paper: roots of x^5 - 21.2014 η (e^x - 1) = 0. */
export const TABLE1: { eta: number; xs: number; xl: number; rw: number; rsf: number }[] = [
  { eta: 0.01, xs: 15.1368, xl: 0.7496, rw: 6.2952, rsf: 0.1195 },
  { eta: 0.05, xs: 12.6168, xl: 1.1958, rw: 3.7584, rsf: 0.1924 },
  { eta: 0.1, xs: 11.4295, xl: 1.4862, rw: 2.906, rsf: 0.2417 },
  { eta: 0.2, xs: 10.1358, xl: 1.8818, rw: 2.1484, rsf: 0.3114 },
  { eta: 0.3, xs: 9.3001, xl: 2.1916, rw: 1.7314, rsf: 0.3685 },
  { eta: 0.4, xs: 8.6505, xl: 2.4682, rw: 1.4375, rsf: 0.4213 },
  { eta: 0.5, xs: 8.0966, xl: 2.7326, rw: 1.2036, rsf: 0.4736 },
  { eta: 0.6, xs: 7.5942, xl: 2.9986, rw: 1.0019, rsf: 0.5281 },
  { eta: 0.7, xs: 7.1131, xl: 3.2796, rw: 0.8158, rsf: 0.5879 },
  { eta: 0.8, xs: 6.6236, xl: 3.596, rw: 0.6311, rsf: 0.6581 },
  { eta: 0.85, xs: 6.3615, xl: 3.7795, rw: 0.5331, rsf: 0.7003 },
  { eta: 0.9, xs: 6.0722, xl: 3.9946, rw: 0.4252, rsf: 0.7512 },
  { eta: 1, xs: 4.9646, xl: 4.9646, rw: 0, rsf: 1 },
];

/** Table 2 is derived from Table 1: λ = C2 / (x T) at T = 1000 K, in μm.
 *  Computing it (instead of copying) is what exposed two typos in the
 *  printed table: η=0.4 (6.8294 → 5.8294) and η=0.5 (2.7325 → 5.2653). */
export const TABLE2 = TABLE1.map(({ eta, xs, xl }) => ({
  eta,
  ls: C2 / (xs * 1000),
  ll: C2 / (xl * 1000),
}));

/** Root of 5(e^x - 1) = x e^x, by method (from the Python notebook). */
export const METHODS = [
  { id: "bisection", x: "4.9651", wT: "2897.8186" },
  { id: "newton", x: "4.965114", wT: "2897.8186" },
  { id: "fixed", x: "4.9651142", wT: "2897.8185" },
  { id: "graphical", x: "4.9301580", wT: "2918.3649" },
] as const;

export const CITATION =
  "Yang, X. & Wei, B. Exact research on the theory of the blackbody thermal radiation. Sci. Rep. 6, 37214 (2016). https://doi.org/10.1038/srep37214";
