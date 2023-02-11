"use strict";
import paperCore from "paper";
import { gsap } from "gsap";

const { Path, Point, Group, Color } = paperCore;

const init = () => {
  // Select elements we need from HTML
  const canvas = document.querySelector<HTMLCanvasElement>("#paper-canvas");
  const twoTwoEl = document.querySelector<SVGAElement>("#twotwo-svg");
  const twoThreeEl = document.querySelector<SVGAElement>("#twothree-svg");

  // exit our code if elements aren't found
  if (!canvas || !twoTwoEl || !twoThreeEl) return;

  // initialize canvas and important values
  paperCore.setup(canvas);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const NUM_COLS = 14;

  // import white 2022 SVG
  const twoTwoGroup = paperCore.project.importSVG(twoTwoEl);
  twoTwoGroup.fillColor = new Color(1, 1, 1);

  // import black 2023 SVG
  const twoThreeGroup = paperCore.project.importSVG(twoThreeEl);
  twoThreeGroup.fillColor = new Color(0, 0, 0);

  // create blue rectangle
  const rect = new Path.Rectangle({
    point: new Point(0, 0),
    size: [w, h],
  });
  rect.fillColor = new Color("#0D9AFF");

  // size SVGs to the viewport
  twoTwoGroup.fitBounds(paperCore.view.bounds);
  twoThreeGroup.fitBounds(paperCore.view.bounds);

  // group the blue rectangle and 2023 SVG together
  const frontGroup = new Group([rect, ...twoThreeGroup.children]);

  // create circlePaths, which will be used to create our clipping mask and animation
  const circlePaths = createCircles(w, h, NUM_COLS);

  // create a clipping mask from our circlePaths, blue rectangle, and 2023 SVG
  const circleGroup = new Group([...circlePaths]);
  let clipGroup = new Group([circleGroup, frontGroup]);
  clipGroup.clipped = true;

  gsap.fromTo(
    circlePaths,
    { scaling: 0.001 }, // don't use 0!
    {
      scaling: 2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.01,
    }
  );
};

function createCircles(w, h, numCols) {
  let circles: paper.Path[] = [];

  // determine size of each circle
  let space = w / numCols;

  // loop through width and height, incrementing by circle diameter each time.
  for (let x = 0; x < w; x += space) {
    for (let y = 0; y < h; y += space) {
      let circle = new Path.Circle({
        radius: space / 2,
        center: new Point(x + space / 2, y + space / 2),
        applyMatrix: false, // skip recalculations that we don't need.
      });
      circles.push(circle);
    }
  }
  return circles;
}

document.addEventListener("DOMContentLoaded", init);
