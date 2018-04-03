import { N, W, BLACK_SQUARE, WHITE_SQUARE } from './coordinate_system';

export const puzzles = {
  1: [[0,1],[1,1,N],1,2,[
    [[0,0],BLACK_SQUARE],
    [[0,1],WHITE_SQUARE]
  ]],
  2: [[0,1],[1,-1,W],1,2,[
    [[0,0],BLACK_SQUARE],
    [[0,1],WHITE_SQUARE]
  ]],
  3: [[0,3],[1,-1,W],1,3,[
    [[0,0],BLACK_SQUARE],
    [[0,1],BLACK_SQUARE],
    [[0,2],WHITE_SQUARE]
  ]],
  4: [[0,2],[2,-1,W],2,2,[
    [[0,0],BLACK_SQUARE],
    [[0,1],BLACK_SQUARE],
    [[1,0],BLACK_SQUARE],
    [[1,1],WHITE_SQUARE]
  ]],
  5: [[0,3],[3,-1,W],3,3,[
    [[0,0],BLACK_SQUARE],
    [[0,1],BLACK_SQUARE],
    [[0,2],WHITE_SQUARE],
    [[1,0],BLACK_SQUARE],
    [[1,1],WHITE_SQUARE],
    [[1,2],WHITE_SQUARE],
    [[2,0],BLACK_SQUARE],
    [[2,1],BLACK_SQUARE],
    [[2,2],WHITE_SQUARE]
  ]],
  6: [[0,3],[-1,2,N],3,3,[
    [[0,0],BLACK_SQUARE],
    [[0,1],BLACK_SQUARE],
    [[0,2],WHITE_SQUARE],
    [[1,0],BLACK_SQUARE],
    [[1,1],WHITE_SQUARE],
    [[1,2],WHITE_SQUARE],
    [[2,0],BLACK_SQUARE],
    [[2,1],BLACK_SQUARE],
    [[2,2],WHITE_SQUARE]
  ]],
  7: [[0,4],[1,-1,W],4,4,[
    [[0,0],BLACK_SQUARE],
    [[0,1],BLACK_SQUARE],
    [[0,2],BLACK_SQUARE],
    [[0,3],WHITE_SQUARE],
    [[1,1],BLACK_SQUARE],
    [[1,2],WHITE_SQUARE],
    [[1,3],WHITE_SQUARE],
    [[2,0],WHITE_SQUARE],
    [[2,1],BLACK_SQUARE],
    [[2,2],BLACK_SQUARE],
    [[2,3],WHITE_SQUARE],
    [[3,0],BLACK_SQUARE],
    [[3,1],BLACK_SQUARE],
    [[3,2],BLACK_SQUARE],
    [[3,3],BLACK_SQUARE]
  ]],
  8: [[0,4],[4,2,N],4,4,[
    [[0,0],BLACK_SQUARE],
    [[0,2],BLACK_SQUARE],
    [[0,3],WHITE_SQUARE],
    [[1,0],BLACK_SQUARE],
    [[1,1],BLACK_SQUARE],
    [[1,2],WHITE_SQUARE],
    [[1,3],WHITE_SQUARE],
    [[2,0],WHITE_SQUARE],
    [[2,1],BLACK_SQUARE],
    [[2,2],BLACK_SQUARE],
    [[2,3],WHITE_SQUARE],
    [[3,0],BLACK_SQUARE],
    [[3,1],BLACK_SQUARE],
    [[3,2],BLACK_SQUARE],
    [[3,3],BLACK_SQUARE]
  ]],
  9: [[0,4],[3,4,W],4,4,[
    [[0,1],BLACK_SQUARE],
    [[0,2],BLACK_SQUARE],
    [[0,3],WHITE_SQUARE],
    [[1,0],BLACK_SQUARE],
    [[1,2],WHITE_SQUARE],
    [[1,3],WHITE_SQUARE],
    [[2,0],WHITE_SQUARE],
    [[2,2],BLACK_SQUARE],
    [[2,3],WHITE_SQUARE],
    [[3,0],BLACK_SQUARE],
    [[3,1],BLACK_SQUARE],
    [[3,3],BLACK_SQUARE]
  ]],
  10: [[0,4],[4,-1,W],4,4,[
    [[0,0],WHITE_SQUARE],
    [[0,1],BLACK_SQUARE],
    [[0,2],BLACK_SQUARE],
    [[0,3],WHITE_SQUARE],
    [[1,0],BLACK_SQUARE],
    [[1,1],BLACK_SQUARE],
    [[1,2],BLACK_SQUARE],
    [[1,3],BLACK_SQUARE],
    [[2,0],BLACK_SQUARE],
    [[2,1],BLACK_SQUARE],
    [[2,2],BLACK_SQUARE],
    [[2,3],BLACK_SQUARE],
    [[3,0],WHITE_SQUARE],
    [[3,1],BLACK_SQUARE],
    [[3,2],BLACK_SQUARE],
    [[3,3],WHITE_SQUARE]
  ]]
};

export default puzzles;
