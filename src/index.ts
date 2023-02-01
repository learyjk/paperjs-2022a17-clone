"use strict";
import paperFull from "paper";
import { Color, PathItem } from "paper/dist/paper-core";
const { Path, Point } = paperFull;

const init = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#paper-canvas");
  const twoTwoEl = document.querySelector<SVGAElement>("#twotwo-svg");
  const twoThreeEl = document.querySelector<SVGElement>("#twothree-svg");
  if (!canvas || !twoTwoEl || !twoThreeEl) return;

  let w = canvas.clientWidth;
  let h = canvas.clientHeight;

  paperFull.setup(canvas);
  paperFull.project.currentStyle = {
    ...paperFull.project.currentStyle,
    fillColor: new Color(0.16, 0.6, 0.97),
  };

  const twoTwo = paperFull.project.importSVG(twoTwoEl, {
    expandedShpaes: true,
  });
  //   const twoThree = paper.project.importSVG(twoThreeEl, {
  //     expandedShpaes: true,
  //   });
  let twoTwoPath = twoTwo.lastChild as paper.CompoundPath;

  twoTwo.fillColor = null; //new Color(1, 1, 1);
  twoTwo.strokeColor = new Color(0, 0, 0.0);
  //   twoThree.fillColor = null; //new Color(0, 0, 0);
  //   twoThree.strokeColor = new Color(0, 0, 0.0);
  twoTwo.fitBounds(paperFull.view.bounds);
  //   twoThree.fitBounds(paperFull.view.bounds);

  let circle = new Path.Circle(new Point(w, 0), 300);
  circle.fillColor = new Color(0, 0, 0.0);
  circle.strokeColor = new Color(0, 0, 0.0);
  let circle2 = new Path.Circle(new Point(w, 400), 300);
  circle2.fillColor = null;
  circle2.strokeColor = new Color(0, 0, 0.0);

  showIntersections(circle, twoTwoPath);
};

function showIntersections(path1, path2) {
  var intersections = path2.getIntersections(path1);
  console.log({ intersections });
  for (var i = 0; i < intersections.length; i++) {
    new Path.Circle({
      center: intersections[i].point,
      radius: 5,
      fillColor: "#ffffff",
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
