var setosaActual = {
    12: `α = 0.3706  [n0, n3, n5, n7] ◀━━ [n10]
    \nα = 1.3816  [n0, n5, n9] ◀━━ [n11]
    \nα = 0.4094  [n6] ◀━━ [n12]
    \nα = 0.6803  [n3, n9] ◀━━ [n13]
    \nα = 0.3777  [n0, n3, n7, n9] ◀━━ [n10, n11]
    \nα = 0.1414  [n0, n1, n2, n3, n5, n7, n9] ◀━━ [n10, n12]
    \nα = 0.1875  [n0, n3, n5, n6, n7, n8, n9] ◀━━ [n10, n13]
    \nα = 0.2039  [n0, n1, n2, n3, n7, n9] ◀━━ [n11, n12]
    \nα = 0.2263  [n3] ◀━━ [n11, n13]
    \nα = 0.1937  [n6] ◀━━ [n12, n13]
    \nα = 0.235  [n0, n2, n3, n4, n5, n7, n9] ◀━━ [n10, n11, n12]
    \nα = 0.2577  [n0, n3, n9] ◀━━ [n10, n11, n13]
    \nα = 0.2056  [n0, n1, n2, n3, n5, n8, n9] ◀━━ [n10, n12, n13]
    \nα = 0.1991  [n0, n2, n3, n4, n5, n6, n7] ◀━━ [n11, n12, n13]
    \nα = 0.2407  [n0, n3, n4, n5, n6, n7] ◀━━ [n10, n11, n12, n13]`,

    13: `α = 0.555  [n0, n3, n5, n7] ◀━━ [n14]
    \nα = 0.9285  [n3, n9] ◀━━ [n15]
    \nα = 0.3982  [n6] ◀━━ [n16]
    \nα = 0.3153  [n0, n5, n8, n9] ◀━━ [n14, n15]
    \nα = 0.1919  [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9] ◀━━ [n14, n16]
    \nα = 0.1972  [n6] ◀━━ [n15, n16]
    \nα = 0.2854  [n3, n5, n6, n7, n8] ◀━━ [n14, n15, n16]`,

    14: `α = 0.764  [n3, n9] ◀━━ [n17]
    \nα = 0.5779  [n0, n3, n5, n7] ◀━━ [n18]
    \nα = 0.316  [n0, n3, n5, n6, n7, n8, n9] ◀━━ [n17, n18]`,

    23: `α = 0.7992  [n10, n11] ◀━━ [n14]
    \nα = 1.1637  [n11, n12, n31] ◀━━ [n15]
    \nα = 0.9415  [n12, n13] ◀━━ [n16]
    \nα = 0.1332  [n10, n11, n12, n13] ◀━━ [n14, n15]
    \nα = 0.1632  [n10, n11, n12, n13] ◀━━ [n14, n16]
    \nα = 0.1717  [n11, n13] ◀━━ [n15, n16]
    \nα = 0.071  [n10, n11, n12] ◀━━ [n14, n15, n16]`,

    24: `α = 1.0339  [n11, n12, n13] ◀━━ [n17]
    \nα = 0.7187  [n10, n11] ◀━━ [n18]
    \nα = 0.1946  [n11] ◀━━ [n17, n18]`,

    34: `α = 0.8831  [n15, n16] ◀━━ [n17]
    \nα = 0.8151  [n14, n15] ◀━━ [n18]
    \nα = 0.0911  [n14, n15, n16] ◀━━ [n17, n8]`
}

// var setosaActual = {
//     12: `α = 0.1585  [n0] ◀━━ [n10]
//     \nα = 0.7523  [n9] ◀━━ [n11]
//     \nα = 0.4094  [n6] ◀━━ [n12]
//     \nα = 0.4682  [n3] ◀━━ [n13]
//     \nα = 0.3123  [n0, n3, n9] ◀━━ [n10, n11]
//     \nα = 0.1036  [n0, n2, n3, n4, n5, n7, n9] ◀━━ [n10, n12]
//     \nα = 0.1546  [n3, n5] ◀━━ [n10, n13]
//     \nα = 0.1445  [n0, n1, n2, n3, n7, n9] ◀━━ [n11, n12]
//     \nα = 0.2263  [n3] ◀━━ [n11, n13]
//     \nα = 0.1937  [n6] ◀━━ [n12, n13]
//     \nα = 0.154  [n0, n2, n3, n4, n5, n7, n9] ◀━━ [n10, n11, n12]
//     \nα = 0.2577  [n0, n3, n9] ◀━━ [n10, n11, n13]
//     \nα = 0.1734  [n0, n5, n6, n8, n9] ◀━━ [n10, n12, n13]
//     \nα = 0.1673  [n0, n3, n5, n6, n7] ◀━━ [n11, n12, n13]
//     \nα = 0.2393  [n0, n3, n5, n6, n7] ◀━━ [n10, n11, n12, n13]`,

//     13: `α = 0.3032  [n0] ◀━━ [n14]
//     \nα = 0.7327  [n9] ◀━━ [n15]
//     \nα = 0.3982  [n6] ◀━━ [n16]
//     \nα = 0.2889  [n0, n5, n9] ◀━━ [n14, n15]
//     \nα = 0.1724  [n0, n1, n3, n4, n5, n7, n9] ◀━━ [n14, n16]
//     \nα = 0.1972  [n6] ◀━━ [n15, n16]
//     \nα = 0.246  [n0, n3, n5, n6] ◀━━ [n14, n15, n16]`,

//     14: `α = 0.5778  [n9] ◀━━ [n17]
//     \nα = 0.3093  [n0] ◀━━ [n18]
//     \nα = 0.1892  [n0, n3, n5, n9] ◀━━ [n17, n17]`,

//     23: `α = 0.7186  [n10] ◀━━ [n14]
//     \nα = 0.6355  [n11] ◀━━ [n15]
//     \nα = 0.838  [n12] ◀━━ [n16]
//     \nα = 0.1232  [n11] ◀━━ [n14, n15]
//     \nα = 0.139  [n10, n11, n12] ◀━━ [n14, n16]
//     \nα = 0.1717  [n11, n13] ◀━━ [n15, n16]
//     \nα = 0.071  [n10, n11, n12] ◀━━ [n14, n15, n16]`,

//     24: `α = 0.5514  [n12] ◀━━ [n17]
//     \nα = 0.6244  [n10] ◀━━ [n18]
//     \nα = 0.1946  [n11] ◀━━ [n17, n18]`,

//     34: `α = 0.7482  [n15] ◀━━ [n17]
//     \nα = 0.7944  [n14] ◀━━ [n18]
//     \nα = 0.0911  [n14, n15, n16] ◀━━ [n17, n18]`
// }