"use strict";
import paperFull from "paper";
import { gsap } from "gsap";
import { Color, CompoundPath, PathItem } from "paper/dist/paper-core";
const { Path, Point } = paperFull;

const init = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#paper-canvas");
  const twoTwoEl = document.querySelector<SVGAElement>("#twotwo-svg");
  const twoThreeEl = document.querySelector<SVGElement>("#twothree-svg");
  if (!canvas || !twoTwoEl || !twoThreeEl) return;

  let w = canvas.clientWidth;
  let h = canvas.clientHeight;

  paperFull.setup(canvas);

  const twoTwoGroup = paperFull.project.importSVG(twoTwoEl);
  twoTwoGroup.fillColor = new Color(1, 1, 1);
  const twoThreeGroup = paperFull.project.importSVG(twoThreeEl);
  twoThreeGroup.fillColor = new Color("transparent");
  let twoThreeCompoundPath = twoThreeGroup.lastChild as paper.CompoundPath;
  twoTwoGroup.fitBounds(paperFull.view.bounds);
  twoThreeGroup.fitBounds(paperFull.view.bounds);

  let circles = createCircles(w, h);

  circles.forEach((circle) => {
    colorIntersection(twoThreeCompoundPath, circle);
  });

  console.log(circles[0]);

  let circleScales = circles.map((circle) => circle.scaling);

  let tween = circles[29].tween(
    { scaling: 0.0001 },
    { scaling: 2 },
    { duration: 1500 }
  );
  tween.onUpdate = function (event) {
    colorIntersection(twoThreeCompoundPath, circles[29]);
  };

  // paperFull.view.onFrame = function () {
  //   circles.forEach((circle) => {
  //     colorIntersection(twoThreeCompoundPath, circle);
  //   });
  // };
};

function colorIntersection(path1: paper.CompoundPath, path2: paper.Path) {
  let result = path2.intersect(path1);
  result.fillColor = new Color(0, 0, 0);
}

function createCircles(w, h) {
  let circles: paper.Path[] = [];
  const numCols = 14;
  let space = w / numCols;
  for (let x = 0; x < w; x += space) {
    for (let y = 0; y < h; y += space) {
      let circle = new Path.Circle({
        radius: space / 2,
        center: new Point(x + space / 2, y + space / 2),
        applyMatrix: false,
        fillColor: new Color("#4698F8"),
      });
      circles.push(circle);
    }
  }
  return circles;
}

// function showIntersections(
//   path1: paper.CompoundPath,
//   path2: paper.CompoundPath
// ) {
//   var intersections = path2.getIntersections(path1);
//   let result = path1.subtract(path2);

//   result.fillColor = new Color("#612A87");

//   console.log({ intersections });
//   intersections;
//   for (var i = 0; i < intersections.length; i++) {
//     new Path.Circle({
//       center: intersections[i].point,
//       radius: 5,
//       fillColor: "#ffffff",
//     });
//   }
// }

document.addEventListener("DOMContentLoaded", init);
