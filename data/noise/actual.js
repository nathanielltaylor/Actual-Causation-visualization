var noiseActual = {
    12: `α = 2.142  [n0, n3, n4, n5, n9] ◀━━ [n10]
    \nα = 0.6985  [n0, n2, n5] ◀━━ [n11]
    \nα = 0.4094  [n1, n2, n4, n5, n9] ◀━━ [n12]
    \nα = 1.4113  [n3, n4, n5, n6] ◀━━ [n13]
    \nα = 0.8093  [n0, n1, n2, n3, n4, n8, n9] ◀━━ [n10, n11]
    \nα = 0.1638  [n0, n1, n2, n4, n5, n9] ◀━━ [n10, n12]
    \nα = 1.7785  [n0, n1, n2, n3, n4, n6, n7, n8, n9] ◀━━ [n10, n13]
    \nα = 0.1854  [n1, n2, n3, n4, n5, n9] ◀━━ [n11, n12]
    \nα = 0.2698  [n0, n1, n2, n3, n4, n6, n7, n8] ◀━━ [n11, n13]
    \nα = 0.4634  [n1, n2, n3, n4, n5, n6, n7, n9] ◀━━ [n12, n13]
    \nα = 0.2071  [n1, n2, n3, n4, n5, n9] ◀━━ [n10, n11, n12]
    \nα = 0.8074  [n0, n1, n2, n3, n4, n6, n7, n8, n9] ◀━━ [n10, n11, n13]
    \nα = 0.2991  [n1, n2, n3, n4, n6, n9] ◀━━ [n10, n12, n13]
    \nα = 0.1748  [n1, n2, n3, n4, n8] ◀━━ [n11, n12, n13]
    \nα = 0.2809  [n1, n2, n3, n4, n5, n6, n9] ◀━━ [n10, n11, n12, n13]`,

    13: `α = 1.6469  [n0, n1, n3, n5, n9] ◀━━ [n14]
    \nα = 1.0752  [n0, n3, n5, n6] ◀━━ [n15]
    \nα = 0.3982  [n0, n1, n2, n4, n9] ◀━━ [n16]
    \nα = 1.5332  [n0, n1, n2, n3, n4, n6, n7, n8, n9] ◀━━ [n14, n15]
    \nα = 0.227  [n0, n1, n2, n3, n4, n9] ◀━━ [n14, n16]
    \nα = 0.5082  [n0, n1, n2, n3, n4, n6, n7, n8, n9] ◀━━ [n15, n16]
    \nα = 0.3454  [n0, n1, n2, n3, n4, n7, n8, n9] ◀━━ [n14, n15, n16]`,

    14: `α = 1.2823  [n3, n5, n6, n7] ◀━━ [n17]
    \nα = 1.5991  [n0, n1, n3, n5, n9] ◀━━ [n18]
    \nα = 1.3897  [n0, n1, n3, n5, n6, n7, n9] ◀━━ [n17, n18]`,

    23: `α = 1.1928  [n10, n11] ◀━━ [n14]
    \nα = 0.8239  [n11, n13] ◀━━ [n15]
    \nα = 0.9415  [n10, n11, n12] ◀━━ [n16]
    \nα = 0.2988  [n10, n11, n13] ◀━━ [n14, n15]
    \nα = 0.0958  [n10, n11, n13] ◀━━ [n14, n16]
    \nα = 0.4645  [n11, n12, n13] ◀━━ [n15, n16]
    \nα = 0.1898  [n10, n11, n12, n13] ◀━━ [n14, n15, n16]`,

    24: `α = 0.7423  [n11, n13] ◀━━ [n17]
    \nα = 1.3006  [n10, n11, n12] ◀━━ [n18]
    \nα = 0.2586  [n11] ◀━━ [n17, n18]`,

    34: `α = 0.852  [n15] ◀━━ [n17]
    \nα = 1.1997  [n14, n16] ◀━━ [n18]
    \nα = 0.1207  [n14, n15] ◀━━ [n17, n18]`
}

// var noiseActual = {
//     12: `α = 0.9622  [n9] ◀━━ [n10]
//     \nα = 0.3989  [n5] ◀━━ [n11]
//     \nα = 0.1373  [n9] ◀━━ [n12]
//     \nα = 0.7105  [n3] ◀━━ [n13]
//     \nα = 0.6752  [n0, n5, n9] ◀━━ [n10, n11]
//     \nα = 0.1593  [n1, n2, n4, n9] ◀━━ [n10, n12]
//     \nα = 0.8397  [n3, n5, n6, n9] ◀━━ [n10, n13]
//     \nα = 0.1547  [n0, n2, n5, n9] ◀━━ [n11, n12]
//     \nα = 0.2342  [n0, n4, n5, n6] ◀━━ [n11, n13]
//     \nα = 0.321  [n2, n3, n4, n5, n6, n9] ◀━━ [n12, n13]
//     \nα = 0.1944  [n1, n2, n3, n4, n9] ◀━━ [n10, n11, n12]
//     \nα = 0.5842  [n0, n1, n2, n3, n4, n6, n8, n9] ◀━━ [n10, n11, n13]
//     \nα = 0.2991  [n1, n2, n3, n4, n6, n9] ◀━━ [n10, n12, n13]
//     \nα = 0.1695  [n2, n4, n5] ◀━━ [n11, n12, n13]
//     \nα = 0.2585  [n1, n2, n3, n4, n5, n6, n9] ◀━━ [n10, n11, n12, n13]`,

//     13: `α = 0.6858  [n9] ◀━━ [n14]
//     \nα = 0.4016  [n3] ◀━━ [n15]
//     \nα = 0.1664  [n9] ◀━━ [n16]
//     \nα = 0.8817  [n3, n5, n6, n9] ◀━━ [n14, n15]
//     \nα = 0.1909  [n1, n2, n3, n4, n9] ◀━━ [n14, n16]
//     \nα = 0.4211  [n0, n1, n2, n3, n4, n6, n7, n8, n9] ◀━━ [n15, n16]
//     \nα = 0.334  [n0, n1, n2, n3, n4, n7, n8, n9] ◀━━ [n14, n15, n16]`,

//     14: `α = 0.5303  [n3] ◀━━ [n17]
//     \nα = 0.6325  [n9] ◀━━ [n18]
//     \nα = 0.8093  [n3, n5, n6, n9] ◀━━ [n17, n18]`,

//     23: `α = 0.872  [n10] ◀━━ [n14]
//     \nα = 0.5323  [n11] ◀━━ [n15]
//     \nα = 0.838  [n12] ◀━━ [n16]
//     \nα = 0.2988  [n10, n11, n13] ◀━━ [n14, n15]
//     \nα = 0.0592  [n10, n11] ◀━━ [n14, n16]
//     \nα = 0.4645  [n11, n12, n13] ◀━━ [n15, n16]
//     \nα = 0.1898  [n10, n11, n12, n13] ◀━━ [n14, n15, n16]`,

//     24: `α = 0.5153  [n13] ◀━━ [n17]
//     \nα = 0.842  [n10] ◀━━ [n18]
//     \nα = 0.2586  [n11] ◀━━ [n17, n18]`,

//     34: `α = 0.852  [n15] ◀━━ [n17]
//     \nα = 0.9726  [n14] ◀━━ [n18]
//     \nα = 0.1207  [n14, n15] ◀━━ [n17, n18]`
// }