import Konva from 'konva';
import  checkCollision  from 'helpers/checkCollision';
import { getAnchorPositions } from 'helpers/anchorHelpers';
import { loadImages } from 'helpers/imageHelpers';
import { getUnmetDependencies } from 'helpers/dependencies';
import { anchorStyles, boardStyles } from '../constants/styleConstants';

const getKonvaElement = (type, varAttrs, styles={}) => (
  new Konva[type](Object.assign({}, varAttrs, styles))
);

const getGroup = ({ x, y }) => (
   getKonvaElement('Group', { x, y })
);

const getBoardBase = ({ width, height }, name, styles) =>  (
  getKonvaElement('Rect', { width, height, name }, styles)
);

const getAnchor = ({ x, y }, name, styles) =>  (
  getKonvaElement('Circle', { x , y, name }, styles)
);

const getModuleGroup = ({ x, y }) => (
  getKonvaElement('Group', { x, y })
);

const getModuleFill =  ({ width, height }, styles) => (
  getKonvaElement('Rect', { width, height }, styles)
);

const getModuleText =  ({ textX: x, textY: y, width, text }) => (
  getKonvaElement('Text', { x, y, width, text })
);

const getModuleBorder = ({ width, height }, styles) => (
  getKonvaElement('Rect', { width, height}, styles)
);

const getModuleImage = ({
  imageX ,
  imageY,
  imageWidth,
  imageHeight,
  image,
  imageSrc,
}) => (
  getKonvaElement('Image', {
    image,
    x: imageX,
    y: imageY,
    width: imageWidth,
    height: imageHeight,
    name: 'image',
    src: imageSrc,
  })
);

const getCollidingIds = (modules) => checkCollision(modules).map(module => module.id);

const isColliding = (module, modules) => {
  const collidingIds = getCollidingIds(modules);
  const moduleId = module.id;

  return collidingIds.includes(moduleId);
}

const getStroke = (module, modules) => (
  isColliding(module, modules)
   ? 'red'
   : module.stroke
);

const getBorderStyles = (module, modules) => ({
  stroke: getStroke(module, modules)
});

const getFill = (unmetDependencies) => (
  unmetDependencies.length > 0
    ? 'red'
    : 'green'
);

const getFillStyles = (module, activeModules, moduleData) => {
  const unmetDependencies = getUnmetDependencies(moduleData, activeModules, module.dependencies);

  return {
    opacity: 0.1,
    fill: getFill(unmetDependencies),
  }
}

const getModule = (attrs, modules, moduleData) => {
  const fillStyles = getFillStyles(attrs, modules, moduleData,);
  const borderStyles = getBorderStyles(attrs, modules);
  const image = getModuleImage(attrs);
  const border = getModuleBorder(attrs, borderStyles);
  const fill = getModuleFill(attrs, fillStyles);
  const text = getModuleText(attrs);
  const moduleGroup = getGroup(attrs);

  moduleGroup.add(image);
  moduleGroup.add(border);
  moduleGroup.add(fill);
  moduleGroup.add(text);

  return moduleGroup;
}

const getModules = (modules, moduleData) => (
  modules.map(module => getModule(module, modules, moduleData))
);

const addModulesToBoard = (modules, board) => {
  let boardWithModules = board;

  modules.forEach(module => {
    boardWithModules.add(module);
  });

  return boardWithModules;
}

const getBoard = (attrs, boardStyles, anchorStyles) => {
  const boardGroup = getGroup({ x: 10, y: 10 });
  const board = getBoardBase(attrs, 'board', boardStyles);
  const anchorPositions = getAnchorPositions(attrs, anchorStyles);

  boardGroup.add(board);

  Object.keys(anchorPositions).forEach(key => {
    const anchor = getAnchor(anchorPositions[key], key, anchorStyles);
    boardGroup.add(anchor)
  });

  return boardGroup;
};

function createTempElement(elementId) {
  const tempElement = document.createElement('div');
  tempElement.id = elementId;

  document.body.appendChild(tempElement);

  return tempElement;
}

export function getCroppedStage(boardLayer) {
  const boardClone = boardLayer.clone();
  const topLeftAnchorX = boardClone.get('.topLeft')[0].attrs.x;
  const topLeftAnchorY = boardClone.get('.topLeft')[0].attrs.y;
  const boardCloneAttrs = boardClone.get('.board')[0].attrs;
  const tempContainer = createTempElement('container');

  const croppedStage = new Konva.Stage({
    width: boardCloneAttrs.width + 20,
    height: boardCloneAttrs.height + 20,
    container: 'container'
  });

  document.body.removeChild(tempContainer);
  croppedStage.add(boardClone);
  return croppedStage;
}

const getProjectCanvas = (project, modules, moduleData) => {
  const board = getBoard(project.board, boardStyles, anchorStyles);
  const moduleNodes = getModules(modules, moduleData);
  const boardWithModules = addModulesToBoard(moduleNodes, board);

  const layer = new Konva.Layer();
  layer.add(boardWithModules);

  const stage = getCroppedStage(layer);
  stage.add(layer);
  return stage;
}

const addImagesToStage = (stage) => {
  const stageImages = stage.get('.image');
  const stageImagePaths = stageImages
  .map(image => image.attrs.src);

  return loadImages(stageImagePaths)
  .then((imageNodes) => {
    imageNodes.forEach((imageNode, i) => {
      stageImages[i].image(imageNode);
    });

    stage.draw();
    return stage;
  });
}

export const getProjectDataUrl = (project, modules, moduleData) => {
  const stage = getProjectCanvas(project, modules, moduleData);

  return addImagesToStage(stage).then((stageWithImages) => (
    stageWithImages.toDataURL()
  ));
}
