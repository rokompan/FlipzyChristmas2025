(function () {
  'use strict';

  var STORAGE_KEY = 'flipzyRewardSystem.settings.v1';
  var DB_NAME = 'flipzyRewardSystemUploads';
  var DB_VERSION = 1;
  var DB_STORE = 'uploads';
  var BOARD = { width: 2100, height: 2970 };

  var SLOT_DEFS = [
    { id: 'mainRewardGift', label: 'Main reward gift', width: 340, height: 315, band: [1760, 2560], motif: 'gift' },
    { id: 'miniRewardGift', label: 'Mini reward gift', width: 260, height: 240, band: [780, 2140], motif: 'miniGift' },
    { id: 'motifTop', label: 'Motif top', width: 240, height: 160, band: [360, 820], motif: 'rainbow' },
    { id: 'motifUpper', label: 'Motif upper', width: 280, height: 260, band: [700, 1220], motif: 'starCloud' },
    { id: 'motifMiddle', label: 'Motif middle', width: 300, height: 250, band: [1200, 1820], motif: 'kite' },
    { id: 'motifLower', label: 'Motif lower', width: 285, height: 265, band: [1820, 2360], motif: 'leafSprig' },
    { id: 'motifBottom', label: 'Motif bottom', width: 340, height: 220, band: [2280, 2640], motif: 'mountains' }
  ];

  var THEMES = [
    {
      id: 'castle',
      name: 'Castle Quest',
      background: '#fff2cf',
      backgroundAlt: '#d9ecff',
      backgroundBand: '#d8c096',
      title: '#4a2b23',
      text: '#5b463f',
      pathOuter: '#9a6a3d',
      pathInner: '#ffd56f',
      pathDash: '#fff4bd',
      pathAccent: '#b98545',
      circleFill: '#fff7dc',
      circleStroke: '#8d5a31',
      circleText: '#50301f',
      miniFill: '#f6c048',
      miniStroke: '#9b651c',
      miniText: '#3c250d',
      rewardFill: '#c65f57',
      rewardStroke: '#79342f',
      rewardText: '#ffffff',
      labelFill: '#fffaf0',
      labelStroke: '#caa66a',
      accent: '#c65f57',
      accent2: '#759b71',
      accent3: '#f6c048',
      roadStyle: 'cobble',
      roadDecor: 'crown',
      motifs: {
        mainRewardGift: 'treasure',
        miniRewardGift: 'coin',
        motifTop: 'castle',
        motifUpper: 'flag',
        motifMiddle: 'shield',
        motifLower: 'starCloud',
        motifBottom: 'mountains'
      }
    },
    {
      id: 'princess',
      name: 'Princess Garden',
      background: '#fff0f8',
      backgroundAlt: '#e9ddff',
      backgroundBand: '#ffe6b5',
      title: '#74315d',
      text: '#5a3c59',
      pathOuter: '#d981a7',
      pathInner: '#ffd6e7',
      pathDash: '#ffffff',
      pathAccent: '#b96fd0',
      circleFill: '#ffffff',
      circleStroke: '#bf6f9b',
      circleText: '#673052',
      miniFill: '#ffe071',
      miniStroke: '#b87d1b',
      miniText: '#35260a',
      rewardFill: '#8f7bd4',
      rewardStroke: '#5b4a9b',
      rewardText: '#ffffff',
      labelFill: '#fffafd',
      labelStroke: '#e8b4cd',
      accent: '#d86d9d',
      accent2: '#8f7bd4',
      accent3: '#ffe071',
      roadStyle: 'ribbon',
      roadDecor: 'heart',
      motifs: {
        mainRewardGift: 'crown',
        miniRewardGift: 'gem',
        motifTop: 'rainbow',
        motifUpper: 'starCloud',
        motifMiddle: 'balloon',
        motifLower: 'flower',
        motifBottom: 'castle'
      }
    },
    {
      id: 'garden',
      name: 'Playful Garden',
      background: '#fff8df',
      backgroundAlt: '#dff3d4',
      backgroundBand: '#f4d994',
      title: '#294c38',
      text: '#36524a',
      pathOuter: '#7cab70',
      pathInner: '#dcefb8',
      pathDash: '#ffffff',
      circleFill: '#ffffff',
      circleStroke: '#6fa86f',
      circleText: '#244331',
      miniFill: '#f3c94f',
      miniStroke: '#b27a20',
      miniText: '#33250a',
      rewardFill: '#ed7473',
      rewardStroke: '#9b4449',
      rewardText: '#ffffff',
      labelFill: '#ffffff',
      labelStroke: '#d9bd84',
      accent: '#ed7473',
      accent2: '#55b8a5',
      accent3: '#f3c94f',
      roadStyle: 'garden',
      roadDecor: 'leaf',
      motifs: {
        mainRewardGift: 'gift',
        miniRewardGift: 'miniGift',
        motifTop: 'rainbow',
        motifUpper: 'leafSprig',
        motifMiddle: 'kite',
        motifLower: 'starCloud',
        motifBottom: 'mountains'
      }
    },
    {
      id: 'space',
      name: 'Space Quest',
      background: '#eef3ff',
      backgroundAlt: '#d9e3ff',
      backgroundBand: '#fff0b8',
      title: '#26305f',
      text: '#34405f',
      pathOuter: '#4f63b7',
      pathInner: '#b9c8ff',
      pathDash: '#ffffff',
      circleFill: '#ffffff',
      circleStroke: '#5669bd',
      circleText: '#242c58',
      miniFill: '#ffe071',
      miniStroke: '#b98514',
      miniText: '#35270a',
      rewardFill: '#ff7f66',
      rewardStroke: '#a94b39',
      rewardText: '#ffffff',
      labelFill: '#ffffff',
      labelStroke: '#bac4ed',
      accent: '#ff7f66',
      accent2: '#4fb5d8',
      accent3: '#ffe071',
      roadStyle: 'space',
      roadDecor: 'star',
      motifs: {
        mainRewardGift: 'rocket',
        miniRewardGift: 'miniGift',
        motifTop: 'planet',
        motifUpper: 'starCloud',
        motifMiddle: 'rocket',
        motifLower: 'rainbow',
        motifBottom: 'mountains'
      }
    },
    {
      id: 'ocean',
      name: 'Ocean Adventure',
      background: '#eafffb',
      backgroundAlt: '#cdeff5',
      backgroundBand: '#ffd6b7',
      title: '#135866',
      text: '#26515b',
      pathOuter: '#18849b',
      pathInner: '#a7e1e8',
      pathDash: '#ffffff',
      circleFill: '#ffffff',
      circleStroke: '#18849b',
      circleText: '#164d58',
      miniFill: '#ffca6e',
      miniStroke: '#ad6c23',
      miniText: '#35250c',
      rewardFill: '#ff6f7e',
      rewardStroke: '#9c3f4b',
      rewardText: '#ffffff',
      labelFill: '#ffffff',
      labelStroke: '#a6d6de',
      accent: '#ff6f7e',
      accent2: '#2ba6b1',
      accent3: '#ffca6e',
      roadStyle: 'river',
      roadDecor: 'bubble',
      motifs: {
        mainRewardGift: 'gift',
        miniRewardGift: 'shell',
        motifTop: 'waves',
        motifUpper: 'rainbow',
        motifMiddle: 'shell',
        motifLower: 'waves',
        motifBottom: 'mountains'
      }
    },
    {
      id: 'candy',
      name: 'Candy Parade',
      background: '#fff0f5',
      backgroundAlt: '#e3fbef',
      backgroundBand: '#ffe7a8',
      title: '#74315d',
      text: '#5b3d55',
      pathOuter: '#c95081',
      pathInner: '#ffd4e2',
      pathDash: '#ffffff',
      circleFill: '#ffffff',
      circleStroke: '#c95081',
      circleText: '#673052',
      miniFill: '#ffe070',
      miniStroke: '#b87d1b',
      miniText: '#35260a',
      rewardFill: '#5fb8a9',
      rewardStroke: '#2e756d',
      rewardText: '#ffffff',
      labelFill: '#ffffff',
      labelStroke: '#edbdd0',
      accent: '#c95081',
      accent2: '#5fb8a9',
      accent3: '#ffe070',
      roadStyle: 'candy',
      roadDecor: 'sprinkle',
      motifs: {
        mainRewardGift: 'gift',
        miniRewardGift: 'miniGift',
        motifTop: 'rainbow',
        motifUpper: 'starCloud',
        motifMiddle: 'balloon',
        motifLower: 'kite',
        motifBottom: 'waves'
      }
    },
    {
      id: 'dino',
      name: 'Dino Trail',
      background: '#fff3df',
      backgroundAlt: '#d9edc2',
      backgroundBand: '#d3e3ff',
      title: '#3b4b2d',
      text: '#4e5037',
      pathOuter: '#827a3d',
      pathInner: '#e3d98e',
      pathDash: '#ffffff',
      circleFill: '#fffdf7',
      circleStroke: '#6f9149',
      circleText: '#34472b',
      miniFill: '#f2c25b',
      miniStroke: '#9c6b23',
      miniText: '#34260d',
      rewardFill: '#7b71c8',
      rewardStroke: '#4f4693',
      rewardText: '#ffffff',
      labelFill: '#ffffff',
      labelStroke: '#d3c199',
      accent: '#7b71c8',
      accent2: '#6f9149',
      accent3: '#f2c25b',
      roadStyle: 'dino',
      roadDecor: 'footprint',
      motifs: {
        mainRewardGift: 'gift',
        miniRewardGift: 'leafSprig',
        motifTop: 'mountains',
        motifUpper: 'leafSprig',
        motifMiddle: 'kite',
        motifLower: 'starCloud',
        motifBottom: 'mountains'
      }
    }
  ];

  var DEFAULT_STATE = {
    childName: 'Mia',
    title: "Mia's Reward Quest",
    subtitle: 'I earn each step by finishing my agreed routine with a calm body and a brave try.',
    startLabel: 'Start',
    rewardLabel: 'Family movie night',
    stepCount: 24,
    showNumbers: true,
    showMiniLabels: true,
    theme: 'castle',
    miniRewards: [6, 12, 18],
    graphicSlots: defaultGraphicSlots()
  };

  function RewardApp(root) {
    this.root = root;
    this.instanceId = root.id || 'FlipzyRewardSystem-' + Math.floor(Math.random() * 1000000);
    this.poster = root.querySelector('[data-flipzy-poster]');
    this.saveStatus = root.querySelector('[data-flipzy-save-status]');
    this.stepPicker = root.querySelector('[data-flipzy-mini-step-picker]');
    this.graphicSlots = root.querySelector('[data-flipzy-graphic-slots]');
    this.state = loadState();
    this.uploads = {};
    this.assetMap = readThemeAssetMap(root);
    this.db = null;
    this.saveTimer = null;
    this.statusTimer = null;
  }

  RewardApp.prototype.init = function () {
    var self = this;

    this.populateThemes();
    this.bindEvents();
    this.renderFormState();
    this.renderMiniStepPicker();
    this.renderGraphicSlots();
    this.renderPoster();

    openUploadDb().then(function (db) {
      self.db = db;
      return loadUploads(db);
    }).then(function (uploads) {
      self.uploads = uploads;
      self.renderGraphicSlots();
      self.renderPoster();
    });
  };

  RewardApp.prototype.populateThemes = function () {
    var selects = this.root.querySelectorAll('select[data-flipzy-control="theme"]');
    var html = THEMES.map(function (theme) {
      return '<option value="' + escapeAttr(theme.id) + '">' + escapeHtml(theme.name) + '</option>';
    }).join('');

    Array.prototype.forEach.call(selects, function (select) {
      select.innerHTML = html;
    });
  };

  RewardApp.prototype.bindEvents = function () {
    var self = this;

    this.root.addEventListener('input', function (event) {
      var control = event.target.closest('[data-flipzy-control]');
      if (!control || control.type === 'checkbox' || control.tagName === 'SELECT') return;
      self.handleControl(control);
    });

    this.root.addEventListener('change', function (event) {
      var control = event.target.closest('[data-flipzy-control]');
      var slotToggle = event.target.closest('[data-flipzy-slot-toggle]');
      var slotUpload = event.target.closest('[data-flipzy-slot-upload]');

      if (slotUpload) {
        self.handleUpload(slotUpload);
        return;
      }

      if (slotToggle) {
        self.setGraphicSlot(slotToggle.getAttribute('data-flipzy-slot-toggle'), slotToggle.checked);
        return;
      }

      if (control) {
        self.handleControl(control);
      }
    });

    this.root.addEventListener('click', function (event) {
      var preset = event.target.closest('[data-flipzy-mini-preset]');
      var step = event.target.closest('[data-flipzy-mini-step]');
      var clearUpload = event.target.closest('[data-flipzy-clear-upload]');
      var printButton = event.target.closest('[data-flipzy-print]');
      var resetButton = event.target.closest('[data-flipzy-reset]');

      if (preset) {
        self.applyMiniPreset(preset.getAttribute('data-flipzy-mini-preset'));
        return;
      }

      if (step) {
        self.toggleMiniStep(parseInt(step.getAttribute('data-flipzy-mini-step'), 10));
        return;
      }

      if (clearUpload) {
        self.clearUpload(clearUpload.getAttribute('data-flipzy-clear-upload'));
        return;
      }

      if (printButton) {
        self.printPoster();
        return;
      }

      if (resetButton) {
        self.state = createDefaultState();
        self.renderFormState();
        self.renderMiniStepPicker();
        self.renderGraphicSlots();
        self.persist();
        self.renderPoster();
      }
    });
  };

  RewardApp.prototype.handleControl = function (control) {
    var key = control.getAttribute('data-flipzy-control');
    var value = readControlValue(control);

    if (key === 'stepCount') {
      value = clamp(parseInt(value, 10) || 1, 1, 50);
      this.state.stepCount = value;
      this.state.miniRewards = normalizeMiniRewards(this.state.miniRewards, value);
      this.syncControls('stepCount');
      this.renderMiniStepPicker();
    } else if (key === 'showNumbers' || key === 'showMiniLabels') {
      this.state[key] = !!value;
    } else if (key === 'theme') {
      this.state.theme = hasTheme(value) ? value : DEFAULT_STATE.theme;
    } else if (typeof this.state[key] === 'string') {
      this.state[key] = value;
    }

    this.persist();
    this.renderPoster();
  };

  RewardApp.prototype.setGraphicSlot = function (slot, enabled) {
    if (!isKnownSlot(slot)) return;
    this.state.graphicSlots[slot] = !!enabled;
    this.persist();
    this.renderPoster();
  };

  RewardApp.prototype.handleUpload = function (input) {
    var self = this;
    var slot = input.getAttribute('data-flipzy-slot-upload');
    var file = input.files && input.files[0];

    if (!isKnownSlot(slot) || !file) return;

    if (file.type !== 'image/png' && !/\.png$/i.test(file.name)) {
      input.value = '';
      window.alert('Please upload a PNG image.');
      return;
    }

    if (!this.db) {
      input.value = '';
      window.alert('This browser could not open local image storage. The poster settings still save, but PNG uploads need IndexedDB.');
      return;
    }

    readFileAsDataUrl(file).then(function (dataUrl) {
      var record = {
        slot: slot,
        name: file.name,
        dataUrl: dataUrl,
        updatedAt: Date.now()
      };

      return saveUpload(self.db, record).then(function () {
        self.uploads[slot] = record;
        input.value = '';
        self.renderGraphicSlots();
        self.renderPoster();
        self.setStatus('PNG saved locally');
      });
    }).catch(function () {
      input.value = '';
      window.alert('The PNG could not be saved in this browser.');
    });
  };

  RewardApp.prototype.clearUpload = function (slot) {
    var self = this;

    if (!isKnownSlot(slot)) return;

    delete this.uploads[slot];

    deleteUpload(this.db, slot).then(function () {
      self.renderGraphicSlots();
      self.renderPoster();
      self.setStatus('Theme graphic restored');
    });
  };

  RewardApp.prototype.applyMiniPreset = function (preset) {
    var count = this.state.stepCount;
    var steps = [];
    var i;

    if (preset === 'half') {
      steps = [Math.round(count / 2)];
    } else if (preset === 'thirds') {
      steps = [Math.round(count / 3), Math.round((count * 2) / 3)];
    } else if (preset === 'quarters') {
      steps = [Math.round(count / 4), Math.round(count / 2), Math.round((count * 3) / 4)];
    } else if (preset === 'every3') {
      for (i = 3; i < count; i += 3) steps.push(i);
    } else if (preset === 'every5') {
      for (i = 5; i < count; i += 5) steps.push(i);
    } else {
      steps = [];
    }

    this.state.miniRewards = normalizeMiniRewards(steps, count);
    this.renderMiniStepPicker();
    this.persist();
    this.renderPoster();
  };

  RewardApp.prototype.toggleMiniStep = function (step) {
    var rewards = this.state.miniRewards.slice();
    var index;

    if (!step || step >= this.state.stepCount) return;

    index = rewards.indexOf(step);
    if (index >= 0) {
      rewards.splice(index, 1);
    } else {
      rewards.push(step);
    }

    this.state.miniRewards = normalizeMiniRewards(rewards, this.state.stepCount);
    this.renderMiniStepPicker();
    this.persist();
    this.renderPoster();
  };

  RewardApp.prototype.renderFormState = function () {
    var self = this;
    var controls = this.root.querySelectorAll('[data-flipzy-control]');

    Array.prototype.forEach.call(controls, function (control) {
      var key = control.getAttribute('data-flipzy-control');

      if (key === 'stepCount') {
        control.value = self.state.stepCount;
      } else if (control.type === 'checkbox') {
        control.checked = !!self.state[key];
      } else if (typeof self.state[key] !== 'undefined') {
        control.value = self.state[key];
      }
    });
  };

  RewardApp.prototype.syncControls = function (key) {
    var controls = this.root.querySelectorAll('[data-flipzy-control="' + key + '"]');
    var value = this.state[key];

    Array.prototype.forEach.call(controls, function (control) {
      if (control.type === 'checkbox') {
        control.checked = !!value;
      } else {
        control.value = value;
      }
    });
  };

  RewardApp.prototype.renderMiniStepPicker = function () {
    var count = this.state.stepCount;
    var miniSet = toSet(this.state.miniRewards);
    var html = [];
    var i;

    if (!this.stepPicker) return;

    for (i = 1; i <= count; i += 1) {
      html.push(
        '<button type="button" data-flipzy-mini-step="' + i + '" aria-pressed="' + (miniSet[i] ? 'true' : 'false') + '"' +
        (i === count ? ' disabled title="Main reward step"' : '') + '>' + i + '</button>'
      );
    }

    this.stepPicker.innerHTML = html.join('');
  };

  RewardApp.prototype.renderGraphicSlots = function () {
    var self = this;
    var html;

    if (!this.graphicSlots) return;

    html = SLOT_DEFS.map(function (slot) {
      var enabled = self.state.graphicSlots[slot.id] !== false;
      var upload = self.uploads[slot.id];
      var inputId = self.instanceId + '-' + slot.id + '-upload';
      var status = upload ? '<div class="flipzy-rewards__slot-status">Uploaded: ' + escapeHtml(upload.name) + '</div>' : '';
      var clearButton = upload ? '<button type="button" data-flipzy-clear-upload="' + escapeAttr(slot.id) + '">Default</button>' : '';

      return [
        '<div class="flipzy-rewards__slot">',
          '<label class="flipzy-rewards__slot-toggle">',
            '<input type="checkbox" data-flipzy-slot-toggle="' + escapeAttr(slot.id) + '"' + (enabled ? ' checked' : '') + '>',
            '<span class="flipzy-rewards__slot-name">' + escapeHtml(slot.label) + '</span>',
          '</label>',
          '<div class="flipzy-rewards__slot-actions">',
            '<input id="' + escapeAttr(inputId) + '" type="file" accept="image/png" data-flipzy-slot-upload="' + escapeAttr(slot.id) + '">',
            '<label class="flipzy-rewards__upload-label" for="' + escapeAttr(inputId) + '" tabindex="0">PNG</label>',
            clearButton,
          '</div>',
          status,
        '</div>'
      ].join('');
    }).join('');

    this.graphicSlots.innerHTML = html;
  };

  RewardApp.prototype.renderPoster = function () {
    if (!this.poster) return;
    this.poster.innerHTML = buildPosterSvg(this.state, this.uploads, this.instanceId, this.assetMap);
  };

  RewardApp.prototype.printPoster = function () {
    var svg = this.poster && this.poster.querySelector('svg');
    var stickerSvg = buildStickerSheetSvg(this.state, this.uploads, this.instanceId, this.assetMap);
    var frame;
    var doc;
    var win;

    if (!svg) return;

    frame = document.createElement('iframe');
    frame.setAttribute('title', 'Reward poster print');
    frame.setAttribute('aria-hidden', 'true');
    frame.style.border = '0';
    frame.style.height = '0';
    frame.style.position = 'fixed';
    frame.style.right = '0';
    frame.style.top = '0';
    frame.style.width = '0';

    document.body.appendChild(frame);

    win = frame.contentWindow;
    doc = win && win.document;

    if (!win || !doc) {
      frame.remove();
      window.print();
      return;
    }

    doc.open();
    doc.write([
      '<!doctype html>',
      '<html>',
        '<head>',
          '<meta charset="utf-8">',
          '<title>Reward poster</title>',
          '<style>',
            '@page{size:A4 portrait;margin:0;}',
            'html,body{background:#fff;margin:0;padding:0;width:210mm;}',
            '.flipzy-print-page{break-after:page;height:297mm;overflow:hidden;page-break-after:always;width:210mm;}',
            '.flipzy-print-page:last-child{break-after:auto;page-break-after:auto;}',
            'svg{display:block;height:297mm;width:210mm;print-color-adjust:exact;-webkit-print-color-adjust:exact;}',
          '</style>',
        '</head>',
        '<body>',
          '<div class="flipzy-print-page">',
            svg.outerHTML,
          '</div>',
          '<div class="flipzy-print-page">',
            stickerSvg,
          '</div>',
        '</body>',
      '</html>'
    ].join(''));
    doc.close();

    window.setTimeout(function () {
      win.focus();
      win.print();
      window.setTimeout(function () {
        frame.remove();
      }, 1000);
    }, 120);
  };

  RewardApp.prototype.persist = function () {
    var self = this;

    window.clearTimeout(this.saveTimer);
    this.setStatus('Saving...');

    this.saveTimer = window.setTimeout(function () {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(self.state));
        self.setStatus('Saved locally');
      } catch (error) {
        self.setStatus('Storage is full');
      }
    }, 120);
  };

  RewardApp.prototype.setStatus = function (message) {
    var self = this;

    if (!this.saveStatus) return;

    this.saveStatus.textContent = message;
    window.clearTimeout(this.statusTimer);

    if (message !== 'Saved locally') {
      this.statusTimer = window.setTimeout(function () {
        self.saveStatus.textContent = 'Saved locally';
      }, 2200);
    }
  };

  function buildPosterSvg(state, uploads, instanceId, assetMap) {
    var theme = getThemeWithAssets(state.theme, assetMap);
    var radius = stepRadius(state.stepCount);
    var header = layoutHeader(state, theme);
    var pathInset = radius >= 90 ? 340 : radius >= 78 ? 300 : 270;
    var pathBottomInset = radius >= 90 ? 390 : radius >= 78 ? 350 : 320;
    var pathArea = {
      left: pathInset,
      right: BOARD.width - pathInset,
      top: Math.max(660, header.box.y + header.box.h + radius + 78),
      bottom: BOARD.height - pathBottomInset
    };
    var points = buildStepPoints(state.stepCount, pathArea);
    var finalPoint = points[points.length - 1];
    var rewardLabel = layoutRewardLabel(state, theme, finalPoint, radius);
    var startLabel = layoutStartLabel(state, points[0], radius, header.box);
    var miniSet = toSet(state.miniRewards);
    var miniLabels = buildMiniLabels(points, miniSet, state.showMiniLabels, radius, header.box, rewardLabel.box);
    var graphicObstacles = [];
    var pathD = buildPath(points);
    var pathTextureId = theme.assets.pathTexture ? svgId(instanceId + '-' + theme.id + '-path-texture') : '';
    var graphics;

    addBox(graphicObstacles, header.box, 22);
    addBox(graphicObstacles, rewardLabel.box, 26);
    addBox(graphicObstacles, startLabel.box, 18);
    addStepObstacles(graphicObstacles, points, radius, miniSet);

    miniLabels.forEach(function (label) {
      addBox(graphicObstacles, label.box, 12);
    });

    graphics = buildGraphics(state, uploads, theme, points, miniSet, graphicObstacles);

    return [
      '<svg class="flipzy-rewards__poster-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + BOARD.width + ' ' + BOARD.height + '" role="img" aria-label="' + escapeAttr(state.title || 'Reward poster') + '">',
        '<title>' + escapeHtml(state.title || 'Reward poster') + '</title>',
        renderDefinitions(theme, pathTextureId),
        renderBackground(theme),
        graphics,
        renderRoad(pathD, radius, theme, pathTextureId),
        renderRoadDecor(points, radius, theme),
        header.svg,
        renderStartLabel(startLabel, theme),
        renderRewardLabel(rewardLabel, theme),
        renderSteps(points, radius, theme, miniSet, state.showNumbers),
        renderMiniLabels(miniLabels, theme),
        state.showNumbers ? '' : renderFinalMarker(finalPoint, radius, theme),
      '</svg>'
    ].join('');
  }

  function buildStickerSheetSvg(state, uploads, instanceId, assetMap) {
    var theme = getThemeWithAssets(state.theme, assetMap);
    var radius = stepRadius(state.stepCount);
    var requested = state.stepCount + Math.max(8, Math.ceil(state.stepCount * 0.25));
    var layout = stickerSheetLayout(radius, requested);
    var stickerUrl = stickerAssetUrl(theme, uploads);
    var title = (cleanText(state.childName) || 'Reward') + ' stickers';
    var pieces = [
      '<svg class="flipzy-rewards__sticker-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + BOARD.width + ' ' + BOARD.height + '" role="img" aria-label="' + escapeAttr(title) + '">',
        '<title>' + escapeHtml(title) + '</title>',
        '<rect width="' + BOARD.width + '" height="' + BOARD.height + '" fill="#ffffff"/>',
        '<path d="M0 0 H' + BOARD.width + ' V260 C1700 345 1360 220 1030 310 C640 416 310 350 0 500 Z" fill="' + theme.backgroundAlt + '" opacity="0.42"/>',
        '<text x="1050" y="150" text-anchor="middle" fill="' + theme.title + '" font-family="Poppins, Arial, sans-serif" font-size="74" font-weight="900" stroke="' + theme.labelFill + '" stroke-width="12" stroke-linejoin="round" paint-order="stroke fill">' + escapeHtml(title) + '</text>',
        '<text x="1050" y="222" text-anchor="middle" fill="' + theme.text + '" font-family="Poppins, Arial, sans-serif" font-size="30" font-weight="800">Cut-out circles for this reward poster</text>'
    ];
    var i;

    for (i = 0; i < layout.positions.length; i += 1) {
      pieces.push(renderSticker(layout.positions[i].x, layout.positions[i].y, radius, theme, stickerUrl, instanceId, i));
    }

    pieces.push('</svg>');
    return pieces.join('');
  }

  function renderBackground(theme) {
    var pieces = ['<rect width="' + BOARD.width + '" height="' + BOARD.height + '" fill="' + theme.background + '"/>'];

    if (theme.assets.background) {
      pieces.push('<image href="' + escapeAttr(theme.assets.background) + '" x="0" y="0" width="' + BOARD.width + '" height="' + BOARD.height + '" preserveAspectRatio="none"/>');
    } else {
      pieces.push('<path d="M0 0 H' + BOARD.width + ' V330 C1710 430 1320 325 980 425 C610 532 285 470 0 610 Z" fill="' + theme.backgroundAlt + '" opacity="0.82"/>');
      pieces.push('<path d="M0 2790 C360 2630 720 2690 1050 2780 C1425 2884 1745 2860 2100 2700 V2970 H0 Z" fill="' + theme.backgroundBand + '" opacity="0.66"/>');
    }

    pieces.push('<rect x="70" y="70" width="1960" height="2830" rx="76" fill="none" stroke="' + theme.labelStroke + '" stroke-width="9" opacity="0.75"/>');
    return pieces.join('');
  }

  function renderDefinitions(theme, pathTextureId) {
    if (!pathTextureId || !theme.assets.pathTexture) return '';

    return [
      '<defs>',
        '<pattern id="' + escapeAttr(pathTextureId) + '" patternUnits="userSpaceOnUse" width="800" height="220">',
          '<image href="' + escapeAttr(theme.assets.pathTexture) + '" x="0" y="0" width="800" height="220" preserveAspectRatio="none"/>',
        '</pattern>',
      '</defs>'
    ].join('');
  }

  function renderRoad(pathD, radius, theme, pathTextureId) {
    if (!pathD) return '';

    var outer = round(radius * (theme.roadStyle === 'river' ? 2.8 : 2.55));
    var inner = round(radius * (theme.roadStyle === 'cobble' ? 1.9 : 1.72));
    var pieces = [
      '<path d="' + pathD + '" fill="none" stroke="' + theme.pathOuter + '" stroke-width="' + outer + '" stroke-linecap="round" stroke-linejoin="round" opacity="0.99"/>',
      '<path d="' + pathD + '" fill="none" stroke="' + theme.pathInner + '" stroke-width="' + inner + '" stroke-linecap="round" stroke-linejoin="round"/>'
    ];

    if (pathTextureId) {
      pieces.push('<path d="' + pathD + '" fill="none" stroke="url(#' + escapeAttr(pathTextureId) + ')" stroke-width="' + round(inner * 0.9) + '" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>');
    }

    if (theme.roadStyle === 'cobble') {
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + (theme.pathAccent || theme.pathOuter) + '" stroke-width="' + round(radius * 0.22) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 0.24) + ' ' + round(radius * 0.5) + '" opacity="0.55"/>');
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + theme.pathDash + '" stroke-width="' + round(radius * 0.12) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 0.46) + ' ' + round(radius * 0.62) + '" opacity="0.85"/>');
    } else if (theme.roadStyle === 'candy') {
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + (theme.pathAccent || theme.accent2) + '" stroke-width="' + round(radius * 0.26) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 0.38) + ' ' + round(radius * 0.9) + '" opacity="0.8"/>');
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + theme.pathDash + '" stroke-width="' + round(radius * 0.13) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 0.3) + ' ' + round(radius * 0.45) + '" opacity="0.95"/>');
    } else if (theme.roadStyle === 'river') {
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + theme.pathDash + '" stroke-width="' + round(radius * 0.12) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 0.32) + ' ' + round(radius * 0.55) + '" opacity="0.8"/>');
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + (theme.pathAccent || theme.accent2) + '" stroke-width="' + round(radius * 0.1) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 1.1) + ' ' + round(radius * 0.9) + '" opacity="0.5"/>');
    } else if (theme.roadStyle === 'dino') {
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + (theme.pathAccent || theme.pathOuter) + '" stroke-width="' + round(radius * 0.18) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 0.25) + ' ' + round(radius * 0.65) + '" opacity="0.65"/>');
    } else {
      pieces.push('<path d="' + pathD + '" fill="none" stroke="' + theme.pathDash + '" stroke-width="' + round(radius * 0.14) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + round(radius * 0.6) + ' ' + round(radius * 0.55) + '" opacity="0.92"/>');
    }

    return pieces.join('');
  }

  function stickerSheetLayout(radius, requested) {
    var marginX = 150;
    var top = 500;
    var bottom = 170;
    var diameter = radius * 2;
    var minGap = clamp(radius * 0.34, 26, 40);
    var usableW = BOARD.width - marginX * 2;
    var usableH = BOARD.height - top - bottom;
    var maxCols = Math.max(1, Math.floor((usableW + minGap) / (diameter + minGap)));
    var maxRows = Math.max(1, Math.floor((usableH + minGap) / (diameter + minGap)));
    var maxCount = maxCols * maxRows;
    var count = Math.min(requested, maxCount);
    var cols = clamp(Math.ceil(Math.sqrt(count * usableW / usableH)), 1, maxCols);
    var rows = Math.ceil(count / cols);
    var totalSlots;
    var xStep;
    var yStep;
    var jitterX;
    var jitterY;
    var positions = [];
    var usedSlots = {};
    var i;

    while (rows > maxRows && cols < maxCols) {
      cols += 1;
      rows = Math.ceil(count / cols);
    }

    totalSlots = rows * cols;
    xStep = cols > 1 ? (usableW - diameter) / (cols - 1) : 0;
    yStep = rows > 1 ? (usableH - diameter) / (rows - 1) : 0;
    jitterX = cols > 1 ? Math.min(radius * 0.42, Math.max(0, (xStep - diameter - minGap) / 2)) : 0;
    jitterY = rows > 1 ? Math.min(radius * 0.36, Math.max(0, (yStep - diameter - minGap) / 2)) : 0;

    for (i = 0; i < count; i += 1) {
      var slot = count === totalSlots || count === 1 ? i : Math.round(i * (totalSlots - 1) / (count - 1));
      var guard = 0;
      var row;
      var col;
      var cx;
      var cy;

      while (usedSlots[slot] && guard < totalSlots) {
        slot = (slot + 1) % totalSlots;
        guard += 1;
      }

      usedSlots[slot] = true;
      row = Math.floor(slot / cols);
      col = slot % cols;
      cx = marginX + radius + (cols > 1 ? col * xStep : (usableW - diameter) / 2) + stickerJitter(i, 11) * jitterX;
      cy = top + radius + (rows > 1 ? row * yStep : (usableH - diameter) / 2) + stickerJitter(i, 23) * jitterY;

      positions.push({
        x: round(clamp(cx, marginX + radius, BOARD.width - marginX - radius)),
        y: round(clamp(cy, top + radius, BOARD.height - bottom - radius))
      });
    }

    return {
      cols: cols,
      count: count,
      positions: positions
    };
  }

  function stickerJitter(index, salt) {
    var value = Math.sin((index + 1) * (salt + 17) * 12.9898) * 43758.5453;
    return (value - Math.floor(value)) * 2 - 1;
  }

  function stickerAssetUrl(theme, uploads) {
    if (uploads && uploads.miniRewardGift && uploads.miniRewardGift.dataUrl) {
      return uploads.miniRewardGift.dataUrl;
    }

    return theme.assets.sticker || theme.assets.miniRewardGift || theme.assets.mainRewardGift || '';
  }

  function renderSticker(cx, cy, radius, theme, stickerUrl, instanceId, index) {
    var clipId = svgId(instanceId + '-sticker-' + index);
    var artSize = round(radius * 1.64);
    var artBox = {
      x: round(cx - artSize / 2),
      y: round(cy - artSize / 2),
      w: artSize,
      h: artSize
    };
    var innerRadius = round(radius - Math.max(10, radius * 0.13));
    var pieces = [
      '<g>',
        '<circle cx="' + round(cx + radius * 0.06) + '" cy="' + round(cy + radius * 0.08) + '" r="' + radius + '" fill="#000000" opacity="0.08"/>',
        '<circle cx="' + round(cx) + '" cy="' + round(cy) + '" r="' + radius + '" fill="' + theme.circleFill + '"/>',
        '<clipPath id="' + escapeAttr(clipId) + '"><circle cx="' + round(cx) + '" cy="' + round(cy) + '" r="' + innerRadius + '"/></clipPath>'
    ];

    if (stickerUrl) {
      pieces.push('<image href="' + escapeAttr(stickerUrl) + '" x="' + artBox.x + '" y="' + artBox.y + '" width="' + artBox.w + '" height="' + artBox.h + '" preserveAspectRatio="xMidYMid meet" clip-path="url(#' + escapeAttr(clipId) + ')"/>');
    } else {
      pieces.push('<g clip-path="url(#' + escapeAttr(clipId) + ')">' + renderMotif(theme.motifs.miniRewardGift || 'miniGift', theme, artBox.x, artBox.y, artBox.w, artBox.h) + '</g>');
    }

    pieces.push(
        '<circle cx="' + round(cx) + '" cy="' + round(cy) + '" r="' + round(radius - 5) + '" fill="none" stroke="' + theme.circleStroke + '" stroke-width="' + clamp(radius * 0.08, 6, 10) + '"/>',
        '<circle cx="' + round(cx) + '" cy="' + round(cy) + '" r="' + radius + '" fill="none" stroke="#707070" stroke-width="2.5" stroke-dasharray="' + round(radius * 0.12) + ' ' + round(radius * 0.08) + '" opacity="0.72"/>',
      '</g>'
    );

    return pieces.join('');
  }

  function renderRoadDecor(points, radius, theme) {
    var pieces = [];
    var every = points.length > 36 ? 6 : points.length > 20 ? 4 : 3;
    var size = clamp(radius * 0.28, 11, 22);

    for (var i = 1; i < points.length - 1; i += every) {
      var a = points[i - 1];
      var b = points[i];
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var len = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      var side = i % 2 === 0 ? 1 : -1;
      var x = clamp((a.x + b.x) / 2 + (-dy / len) * radius * 1.38 * side, 82, BOARD.width - 82);
      var y = clamp((a.y + b.y) / 2 + (dx / len) * radius * 1.38 * side, 430, BOARD.height - 230);

      pieces.push(renderRoadDecorShape(theme.roadDecor || 'star', x, y, size, theme, i));
    }

    return '<g opacity="0.9">' + pieces.join('') + '</g>';
  }

  function renderRoadDecorShape(kind, x, y, size, theme, index) {
    if (kind === 'bubble') {
      return '<g fill="none" stroke="' + theme.accent2 + '" stroke-width="4"><circle cx="' + round(x) + '" cy="' + round(y) + '" r="' + round(size * 0.75) + '"/><circle cx="' + round(x + size * 0.9) + '" cy="' + round(y - size * 0.65) + '" r="' + round(size * 0.38) + '"/></g>';
    }

    if (kind === 'heart') {
      return '<path d="M' + round(x) + ' ' + round(y + size * 0.78) + ' C' + round(x - size * 1.25) + ' ' + round(y - size * 0.2) + ' ' + round(x - size * 0.72) + ' ' + round(y - size) + ' ' + round(x) + ' ' + round(y - size * 0.35) + ' C' + round(x + size * 0.72) + ' ' + round(y - size) + ' ' + round(x + size * 1.25) + ' ' + round(y - size * 0.2) + ' ' + round(x) + ' ' + round(y + size * 0.78) + ' Z" fill="' + theme.accent + '"/>';
    }

    if (kind === 'leaf') {
      return '<path d="M' + round(x - size) + ' ' + round(y + size * 0.5) + ' C' + round(x - size * 0.55) + ' ' + round(y - size * 0.95) + ' ' + round(x + size * 0.85) + ' ' + round(y - size * 0.8) + ' ' + round(x + size) + ' ' + round(y + size * 0.45) + ' C' + round(x + size * 0.12) + ' ' + round(y + size * 0.8) + ' ' + round(x - size * 0.52) + ' ' + round(y + size * 0.72) + ' ' + round(x - size) + ' ' + round(y + size * 0.5) + ' Z" fill="' + theme.accent2 + '"/>';
    }

    if (kind === 'footprint') {
      return '<g fill="' + theme.pathOuter + '"><ellipse cx="' + round(x) + '" cy="' + round(y) + '" rx="' + round(size * 0.48) + '" ry="' + round(size * 0.68) + '" transform="rotate(' + (index % 2 ? -18 : 18) + ' ' + round(x) + ' ' + round(y) + ')"/><circle cx="' + round(x - size * 0.38) + '" cy="' + round(y - size * 0.75) + '" r="' + round(size * 0.18) + '"/><circle cx="' + round(x) + '" cy="' + round(y - size * 0.88) + '" r="' + round(size * 0.18) + '"/><circle cx="' + round(x + size * 0.38) + '" cy="' + round(y - size * 0.75) + '" r="' + round(size * 0.18) + '"/></g>';
    }

    if (kind === 'sprinkle') {
      return '<g stroke-linecap="round" stroke-width="5"><path d="M' + round(x - size) + ' ' + round(y) + ' L' + round(x - size * 0.2) + ' ' + round(y - size * 0.45) + '" stroke="' + theme.accent + '"/><path d="M' + round(x + size * 0.2) + ' ' + round(y + size * 0.55) + ' L' + round(x + size) + ' ' + round(y + size * 0.1) + '" stroke="' + theme.accent2 + '"/></g>';
    }

    if (kind === 'crown') {
      return '<path d="M' + round(x - size) + ' ' + round(y + size * 0.55) + ' L' + round(x - size * 0.65) + ' ' + round(y - size * 0.45) + ' L' + round(x) + ' ' + round(y + size * 0.1) + ' L' + round(x + size * 0.65) + ' ' + round(y - size * 0.45) + ' L' + round(x + size) + ' ' + round(y + size * 0.55) + ' Z" fill="' + theme.accent3 + '" stroke="' + theme.miniStroke + '" stroke-width="3"/>';
    }

    return '<polygon points="' + starPoints(x, y, size, size * 0.44, 5) + '" fill="' + theme.accent3 + '"/>';
  }

  function miniBadgeRadius(radius) {
    return radius + clamp(Math.round(radius * 0.12), 8, 12);
  }

  function finalBadgeRadius(radius) {
    return radius + clamp(Math.round(radius * 0.28), 20, 28);
  }

  function renderSteps(points, radius, theme, miniSet, showNumbers) {
    return points.map(function (point) {
      var isFinal = point.index === points.length;
      var isMini = !!miniSet[point.index] && !isFinal;
      var r = isFinal ? finalBadgeRadius(radius) : (isMini ? miniBadgeRadius(radius) : radius);
      var fill = isFinal ? theme.rewardFill : (isMini ? theme.miniFill : theme.circleFill);
      var stroke = isFinal ? theme.rewardStroke : (isMini ? theme.miniStroke : theme.circleStroke);
      var text = isFinal ? theme.rewardText : (isMini ? theme.miniText : theme.circleText);
      var strokeWidth = isFinal ? 15 : (isMini ? 13 : 11);
      var textStroke = isFinal ? ' stroke="' + theme.rewardStroke + '" stroke-width="' + round(r * 0.08) + '" stroke-linejoin="round" paint-order="stroke fill"' : '';
      var pieces = [
        isFinal ? '<polygon points="' + starPoints(point.x, point.y, r * 1.64, r * 1.17, 22) + '" fill="' + theme.accent3 + '" opacity="0.92"/>' : '',
        isMini ? '<polygon points="' + starPoints(point.x, point.y, r * 1.32, r * 1.08, 14) + '" fill="' + theme.accent3 + '" opacity="0.42"/>' : '',
        isFinal ? '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + round(r * 1.28) + '" fill="' + theme.rewardFill + '" opacity="0.2"/>' : '',
        '<circle cx="' + (point.x + (isFinal ? 11 : 8)) + '" cy="' + (point.y + (isFinal ? 15 : 12)) + '" r="' + r + '" fill="#000000" opacity="' + (isFinal ? 0.18 : (isMini ? 0.15 : 0.12)) + '"/>',
        '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '"/>',
        isFinal ? '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + round(r - strokeWidth * 0.9) + '" fill="none" stroke="' + theme.labelFill + '" stroke-width="6" opacity="0.82"/>' : '',
        isMini ? '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + round(r - strokeWidth * 0.7) + '" fill="none" stroke="' + theme.labelFill + '" stroke-width="5" opacity="0.62"/>' : ''
      ];

      if (isMini) {
        pieces.push('<polygon points="' + starPoints(point.x + r * 0.52, point.y - r * 0.52, r * 0.25, r * 0.11, 5) + '" fill="' + theme.rewardFill + '" stroke="' + stroke + '" stroke-width="5"/>');
      }

      if (showNumbers) {
        pieces.push('<text x="' + point.x + '" y="' + point.y + '" text-anchor="middle" dominant-baseline="middle" fill="' + text + '" font-family="Poppins, Arial, sans-serif" font-size="' + round(r * (isFinal ? 0.72 : 0.76)) + '" font-weight="900"' + textStroke + '>' + point.index + '</text>');
      } else if (isMini) {
        pieces.push('<polygon points="' + starPoints(point.x, point.y, r * 0.32, r * 0.15, 5) + '" fill="' + text + '" opacity="0.9"/>');
      }

      return '<g>' + pieces.join('') + '</g>';
    }).join('');
  }

  function renderFinalMarker(point, radius, theme) {
    var r = finalBadgeRadius(radius) * 0.82;
    var x = point.x - r * 0.38;
    var y = point.y - r * 0.28;
    var w = r * 0.76;
    var h = r * 0.58;

    return [
      '<g opacity="0.96">',
        '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + round(r * 0.1) + '" fill="none" stroke="' + theme.rewardText + '" stroke-width="8"/>',
        '<path d="M' + (x + w * 0.5) + ' ' + y + ' V' + (y + h) + '" stroke="' + theme.rewardText + '" stroke-width="8" stroke-linecap="round"/>',
        '<path d="M' + x + ' ' + (y + h * 0.34) + ' H' + (x + w) + '" stroke="' + theme.rewardText + '" stroke-width="8" stroke-linecap="round"/>',
      '</g>'
    ].join('');
  }

  function renderMiniLabels(labels, theme) {
    return labels.map(function (label) {
      return [
        '<g>',
          '<rect x="' + (label.box.x + 5) + '" y="' + (label.box.y + 7) + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="27" fill="#000000" opacity="0.12"/>',
          '<rect x="' + label.box.x + '" y="' + label.box.y + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="27" fill="' + theme.miniFill + '" stroke="' + theme.miniStroke + '" stroke-width="5"/>',
          '<rect x="' + (label.box.x + 13) + '" y="' + (label.box.y + 10) + '" width="' + (label.box.w - 26) + '" height="' + round(label.box.h * 0.32) + '" rx="13" fill="' + theme.labelFill + '" opacity="0.38"/>',
          '<text x="' + (label.box.x + label.box.w / 2) + '" y="' + (label.box.y + label.box.h / 2 + 11) + '" text-anchor="middle" fill="' + theme.miniText + '" font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="900">Mini reward</text>',
        '</g>'
      ].join('');
    }).join('');
  }

  function renderStartLabel(label, theme) {
    return [
      '<g>',
        '<text x="' + (label.box.x + label.box.w / 2) + '" y="' + (label.box.y + label.box.h / 2 + 12) + '" text-anchor="middle" fill="' + theme.title + '" font-family="Poppins, Arial, sans-serif" font-size="50" font-weight="900">' + escapeHtml(label.text) + '</text>',
      '</g>'
    ].join('');
  }

  function renderRewardLabel(label, theme) {
    var centerY = label.box.y + label.box.h / 2 - ((label.lines.length - 1) * label.lineHeight) / 2;

    return [
      '<g>',
        '<rect x="' + (label.box.x + 7) + '" y="' + (label.box.y + 10) + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="' + round(label.box.h / 2) + '" fill="#000000" opacity="0.16"/>',
        '<rect x="' + label.box.x + '" y="' + label.box.y + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="' + round(label.box.h / 2) + '" fill="' + theme.rewardFill + '" stroke="' + theme.rewardStroke + '" stroke-width="7"/>',
        '<rect x="' + (label.box.x + 18) + '" y="' + (label.box.y + 14) + '" width="' + (label.box.w - 36) + '" height="' + round(label.box.h * 0.3) + '" rx="' + round(label.box.h * 0.15) + '" fill="' + theme.labelFill + '" opacity="0.28"/>',
        label.lines.map(function (line, index) {
          return '<text x="' + (label.box.x + label.box.w / 2) + '" y="' + round(centerY + index * label.lineHeight) + '" text-anchor="middle" dominant-baseline="middle" fill="' + theme.rewardText + '" stroke="' + theme.rewardStroke + '" stroke-width="' + round(label.fontSize * 0.09) + '" stroke-linejoin="round" paint-order="stroke fill" font-family="Poppins, Arial, sans-serif" font-size="' + label.fontSize + '" font-weight="900">' + escapeHtml(line) + '</text>';
        }).join(''),
      '</g>'
    ].join('');
  }

  function layoutHeader(state, theme) {
    var child = cleanText(state.childName);
    var title = cleanText(state.title) || 'Reward Quest';
    var subtitle = cleanText(state.subtitle);
    var titleLayout = layoutText(title, 1540, 88, 58, 2);
    var subtitleLayout = layoutText(subtitle, 1580, 34, 25, 2);
    var y = child ? 210 : 142;
    var pieces = [];
    var titleY = y;
    var subtitleY;
    var bottom;
    var halo = theme.assets && theme.assets.background ? theme.labelFill : '';

    if (child) {
      var badgeText = 'For ' + child;
      var badgeW = clamp(approxTextWidth(badgeText, 28, 800) + 64, 180, 760);
      pieces.push('<rect x="' + (1050 - badgeW / 2) + '" y="82" width="' + badgeW + '" height="54" rx="27" fill="' + theme.labelFill + '" stroke="' + theme.labelStroke + '" stroke-width="4"/>');
      pieces.push('<text x="1050" y="118" text-anchor="middle" fill="' + theme.text + '" font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="900">' + escapeHtml(badgeText) + '</text>');
    }

    pieces.push(svgTextLines(titleLayout.lines, 1050, titleY, titleLayout.fontSize, titleLayout.lineHeight, theme.title, 900, 'middle', halo));
    subtitleY = titleY + titleLayout.lineHeight * titleLayout.lines.length + 22;

    if (subtitleLayout.lines.length) {
      pieces.push(svgTextLines(subtitleLayout.lines, 1050, subtitleY, subtitleLayout.fontSize, subtitleLayout.lineHeight, theme.text, 800, 'middle', halo));
      bottom = subtitleY + subtitleLayout.lineHeight * subtitleLayout.lines.length;
    } else {
      bottom = subtitleY;
    }

    return {
      svg: '<g>' + pieces.join('') + '</g>',
      box: { x: 180, y: 58, w: 1740, h: bottom - 58 + 42 }
    };
  }

  function layoutRewardLabel(state, theme, point, radius) {
    var text = cleanText(state.rewardLabel) || 'Special reward';
    var lines = layoutText(text, 660, 52, 34, 2);
    var longest = lines.lines.reduce(function (width, line) {
      return Math.max(width, approxTextWidth(line, lines.fontSize, 900));
    }, 0);
    var h = Math.max(90, lines.lineHeight * lines.lines.length + 30);
    var w = clamp(longest + 112, 520, 760);
    var rewardRadius = finalBadgeRadius(radius);
    var y = point.y + rewardRadius + 64;

    if (y + h > BOARD.height - 120) y = point.y - rewardRadius - h - 80;

    return {
      box: {
        x: clamp(point.x - w / 2, 70, BOARD.width - w - 70),
        y: y,
        w: w,
        h: h
      },
      lines: lines.lines,
      fontSize: lines.fontSize,
      lineHeight: lines.lineHeight
    };
  }

  function layoutStartLabel(state, point, radius, headerBox) {
    var text = cleanText(state.startLabel) || 'Start';
    var width = clamp(approxTextWidth(text, 50, 900) + 60, 180, 520);
    var height = 72;
    var y = point.y - radius - height - 34;

    if (y < headerBox.y + headerBox.h + 14) {
      y = point.y + radius + 24;
    }

    return {
      text: text,
      box: {
        x: clamp(point.x - width / 2, 90, BOARD.width - width - 90),
        y: y,
        w: width,
        h: height
      }
    };
  }

  function buildMiniLabels(points, miniSet, showLabels, radius, headerBox, rewardBox) {
    var labels = [];
    var badgeRadius = miniBadgeRadius(radius);
    var labelWidth = 220;
    var labelHeight = 54;

    if (!showLabels) return labels;

    points.forEach(function (point) {
      var box;
      var y;

      if (!miniSet[point.index] || point.index === points.length) return;

      y = point.row % 2 === 0 ? point.y - badgeRadius - 74 : point.y + badgeRadius + 18;
      if (y < headerBox.y + headerBox.h + 12) y = point.y + badgeRadius + 18;
      if (y + labelHeight > rewardBox.y - 20) y = point.y - badgeRadius - 74;

      box = {
        x: clamp(point.x - labelWidth / 2, 70, BOARD.width - labelWidth - 70),
        y: y,
        w: labelWidth,
        h: labelHeight
      };

      labels.push({ point: point, box: box });
    });

    return labels;
  }

  function buildStepPoints(count, area) {
    var cols = count <= 8 ? 4 : count <= 30 ? 5 : count <= 42 ? 6 : 7;
    var rows = Math.ceil(count / cols);
    if (rows % 2 === 0 && rows < count) rows += 1;
    var base = Math.floor(count / rows);
    var extra = count % rows;
    var yGap = rows === 1 ? 0 : (area.bottom - area.top) / (rows - 1);
    var points = [];
    var index = 1;
    var row;

    for (row = 0; row < rows; row += 1) {
      var rowCount = base + (row < extra ? 1 : 0);
      var rowInset = rows > 3 ? (row % 2) * 22 : row * 12;
      var rowLeft = area.left + rowInset;
      var rowRight = area.right - rowInset;
      var xGap = rowCount === 1 ? 0 : (rowRight - rowLeft) / (rowCount - 1);
      var rowY = rows === 1 ? (area.top + area.bottom) / 2 : area.bottom - yGap * row;
      var wave = clamp(yGap * 0.055, 5, 15);
      var col;

      for (col = 0; col < rowCount; col += 1) {
        var displayCol = row % 2 === 1 ? rowCount - 1 - col : col;
        var t = rowCount === 1 ? 0.5 : displayCol / (rowCount - 1);
        var x = rowCount === 1 ? (area.left + area.right) / 2 : rowLeft + xGap * displayCol;
        var y = rowY + Math.sin(t * Math.PI * 2 + row * 0.65) * wave;

        points.push({
          index: index,
          x: Math.round(clamp(x, area.left, area.right)),
          y: Math.round(clamp(y, area.top, area.bottom)),
          row: row
        });
        index += 1;
      }
    }

    return points;
  }

  function buildPath(points) {
    if (!points || points.length < 2) return '';
    var path = 'M' + points[0].x + ' ' + points[0].y;

    for (var i = 0; i < points.length - 1; i += 1) {
      var p1 = points[i];
      var p2 = points[i + 1];
      var dx = p2.x - p1.x;
      var dy = p2.y - p1.y;
      var wave = ((i % 2 === 0) ? 1 : -1) * clamp(Math.abs(dx) * 0.035, 8, 28);
      var c1x;
      var c1y;
      var c2x;
      var c2y;
      var side;
      var turn;

      if (p1.row === p2.row) {
        c1x = p1.x + dx * 0.38;
        c1y = p1.y + wave;
        c2x = p2.x - dx * 0.38;
        c2y = p2.y + wave;
      } else {
        side = p1.x > BOARD.width / 2 ? 1 : -1;
        turn = clamp(Math.abs(dy) * 0.38, 185, 230);
        c1x = clamp(p1.x + side * turn, 170, BOARD.width - 170);
        c1y = p1.y;
        c2x = clamp(p2.x + side * turn, 170, BOARD.width - 170);
        c2y = p2.y;
      }

      path += ' C' + round(c1x) + ' ' + round(c1y) + ' ' + round(c2x) + ' ' + round(c2y) + ' ' + p2.x + ' ' + p2.y;
    }

    return path;
  }

  function buildGraphics(state, uploads, theme, points, miniSet, baseObstacles) {
    var obstacles = baseObstacles.slice();
    var pieces = [];

    SLOT_DEFS.forEach(function (slot) {
      var scales = graphicScales(state.stepCount);
      var activeSlot;
      var box = null;
      var i;

      if (state.graphicSlots[slot.id] === false) return;

      for (i = 0; i < scales.length; i += 1) {
        activeSlot = resizeGraphicSlot(slot, scales[i]);
        box = findSafeGraphicBox(activeSlot, obstacles, points, miniSet);
        if (box) break;
      }

      if (!box) return;

      pieces.push(renderGraphicSlot(activeSlot, theme, box, uploads[slot.id]));
      addBox(obstacles, box, 22);
    });

    return pieces.join('');
  }

  function findSafeGraphicBox(slot, obstacles, points, miniSet) {
    var preferred = preferredGraphicPosition(slot, points, miniSet);
    var candidates = [];
    var x;
    var y;
    var offsets = [
      [0, 0], [-140, 0], [140, 0], [0, -120], [0, 120],
      [-220, -90], [220, -90], [-220, 90], [220, 90]
    ];

    offsets.forEach(function (offset) {
      candidates.push({
        x: clamp(preferred.x + offset[0], 70, BOARD.width - slot.width - 70),
        y: clamp(preferred.y + offset[1], 330, BOARD.height - slot.height - 260)
      });
    });

    for (y = 330; y <= BOARD.height - slot.height - 260; y += 78) {
      for (x = 70; x <= BOARD.width - slot.width - 70; x += 78) {
        candidates.push({ x: x, y: y });
      }
    }

    candidates.sort(function (a, b) {
      return graphicScore(a, slot, preferred) - graphicScore(b, slot, preferred);
    });

    for (var i = 0; i < candidates.length; i += 1) {
      var candidate = {
        x: Math.round(candidates[i].x),
        y: Math.round(candidates[i].y),
        w: slot.width,
        h: slot.height
      };

      if (!collides(candidate, obstacles)) return candidate;
    }

    return null;
  }

  function graphicScales(stepCount) {
    if (stepCount > 42) return [0.55, 0.46];
    if (stepCount > 34) return [0.68, 0.55, 0.46];
    if (stepCount > 28) return [0.82, 0.68, 0.55];
    return [1, 0.84, 0.68, 0.55];
  }

  function resizeGraphicSlot(slot, scale) {
    var copy;

    copy = {};
    Object.keys(slot).forEach(function (key) {
      copy[key] = slot[key];
    });
    copy.width = Math.round(slot.width * scale);
    copy.height = Math.round(slot.height * scale);
    return copy;
  }

  function preferredGraphicPosition(slot, points, miniSet) {
    var finalPoint = points[points.length - 1];
    var miniPoint = null;
    var x;
    var y;

    points.some(function (point) {
      if (miniSet[point.index]) {
        miniPoint = point;
        return true;
      }
      return false;
    });

    if (slot.id === 'mainRewardGift') {
      x = finalPoint.x < BOARD.width / 2 ? BOARD.width - slot.width - 150 : 150;
      y = clamp(finalPoint.y - slot.height / 2, slot.band[0], slot.band[1] - slot.height);
      return { x: x, y: y };
    }

    if (slot.id === 'miniRewardGift' && miniPoint) {
      x = miniPoint.x < BOARD.width / 2 ? BOARD.width - slot.width - 135 : 135;
      y = clamp(miniPoint.y - slot.height / 2, slot.band[0], slot.band[1] - slot.height);
      return { x: x, y: y };
    }

    var sideLeft = slot.id === 'motifUpper' || slot.id === 'motifLower';
    x = sideLeft ? 130 : BOARD.width - slot.width - 130;
    y = (slot.band[0] + slot.band[1] - slot.height) / 2;

    if (slot.id === 'motifMiddle') x = BOARD.width - slot.width - 150;
    if (slot.id === 'motifBottom') x = 150;

    return { x: x, y: y };
  }

  function graphicScore(candidate, slot, preferred) {
    var cx = candidate.x + slot.width / 2;
    var cy = candidate.y + slot.height / 2;
    var px = preferred.x + slot.width / 2;
    var py = preferred.y + slot.height / 2;
    var bandCenter = (slot.band[0] + slot.band[1]) / 2;
    var edgePenalty = cx > 590 && cx < 1510 ? 190 : 0;

    return Math.abs(cx - px) + Math.abs(cy - py) + Math.abs(cy - bandCenter) * 0.45 + edgePenalty;
  }

  function renderGraphicSlot(slot, theme, box, upload) {
    var themeAsset = theme.assets[slot.id];

    if (upload && upload.dataUrl) {
      return renderImage(upload.dataUrl, box);
    }

    if (themeAsset) {
      return renderImage(themeAsset, box);
    }

    return renderMotif(theme.motifs[slot.id] || slot.motif, theme, box.x, box.y, box.w, box.h);
  }

  function renderImage(url, box) {
    return '<image href="' + escapeAttr(url) + '" x="' + box.x + '" y="' + box.y + '" width="' + box.w + '" height="' + box.h + '" preserveAspectRatio="xMidYMid meet"/>';
  }

  function renderMotif(name, theme, x, y, w, h) {
    var body;

    if (name === 'gift') {
      body = [
        '<rect x="21" y="43" width="58" height="45" rx="7" fill="' + theme.accent + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<rect x="17" y="32" width="66" height="18" rx="6" fill="' + theme.accent3 + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<path d="M50 31 V88" stroke="#fff" stroke-width="6"/>',
        '<path d="M20 52 H80" stroke="#fff" stroke-width="6"/>',
        '<path d="M50 32 C33 17 22 20 25 31 C28 41 40 39 50 32 Z" fill="' + theme.accent2 + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<path d="M50 32 C67 17 78 20 75 31 C72 41 60 39 50 32 Z" fill="' + theme.accent2 + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>'
      ].join('');
    } else if (name === 'miniGift') {
      body = [
        '<polygon points="' + starPoints(22, 24, 12, 5, 5) + '" fill="' + theme.accent3 + '"/>',
        '<polygon points="' + starPoints(82, 22, 10, 4, 5) + '" fill="' + theme.accent + '"/>',
        '<rect x="30" y="48" width="42" height="34" rx="6" fill="' + theme.miniFill + '" stroke="' + theme.miniStroke + '" stroke-width="3"/>',
        '<rect x="27" y="38" width="48" height="14" rx="5" fill="' + theme.accent2 + '" stroke="' + theme.miniStroke + '" stroke-width="3"/>',
        '<path d="M51 38 V82 M28 55 H74" stroke="#fff" stroke-width="5" stroke-linecap="round"/>'
      ].join('');
    } else if (name === 'rainbow') {
      body = [
        '<path d="M13 74 A37 37 0 0 1 87 74" fill="none" stroke="' + theme.accent + '" stroke-width="12" stroke-linecap="round"/>',
        '<path d="M25 74 A25 25 0 0 1 75 74" fill="none" stroke="' + theme.accent3 + '" stroke-width="12" stroke-linecap="round"/>',
        '<path d="M37 74 A13 13 0 0 1 63 74" fill="none" stroke="' + theme.accent2 + '" stroke-width="12" stroke-linecap="round"/>',
        '<rect x="8" y="71" width="84" height="16" rx="8" fill="' + theme.labelFill + '" opacity="0.9"/>'
      ].join('');
    } else if (name === 'starCloud') {
      body = [
        '<path d="M19 66 C14 50 25 39 39 44 C45 29 67 32 70 49 C84 48 91 61 84 73 C79 82 63 82 48 82 H30 C23 82 18 77 19 66 Z" fill="' + theme.labelFill + '" stroke="' + theme.labelStroke + '" stroke-width="3"/>',
        '<polygon points="' + starPoints(22, 26, 11, 5, 5) + '" fill="' + theme.accent3 + '"/>',
        '<polygon points="' + starPoints(78, 24, 13, 6, 5) + '" fill="' + theme.accent + '"/>',
        '<polygon points="' + starPoints(62, 10, 8, 4, 5) + '" fill="' + theme.accent2 + '"/>'
      ].join('');
    } else if (name === 'leafSprig') {
      body = [
        '<path d="M21 84 C39 55 56 30 82 15" fill="none" stroke="' + theme.accent2 + '" stroke-width="6" stroke-linecap="round"/>',
        '<path d="M38 60 C21 52 19 35 38 32 C51 35 50 53 38 60 Z" fill="' + theme.backgroundAlt + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M55 40 C40 29 44 14 63 15 C75 21 69 37 55 40 Z" fill="' + theme.accent3 + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M66 30 C80 24 91 33 83 48 C72 54 62 43 66 30 Z" fill="' + theme.labelFill + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>'
      ].join('');
    } else if (name === 'rocket') {
      body = [
        '<path d="M52 10 C70 25 75 50 61 75 L40 75 C26 50 32 25 52 10 Z" fill="' + theme.accent + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<circle cx="52" cy="40" r="10" fill="' + theme.labelFill + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<path d="M40 69 L24 84 L34 56 Z" fill="' + theme.accent2 + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<path d="M61 69 L79 84 L70 56 Z" fill="' + theme.accent2 + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<path d="M45 76 C44 88 57 88 58 76" fill="' + theme.accent3 + '"/>'
      ].join('');
    } else if (name === 'planet') {
      body = [
        '<ellipse cx="50" cy="52" rx="28" ry="24" fill="' + theme.accent2 + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M14 58 C31 35 68 32 88 45 C68 67 31 72 14 58 Z" fill="none" stroke="' + theme.accent + '" stroke-width="7" stroke-linecap="round"/>',
        '<polygon points="' + starPoints(20, 24, 8, 3, 5) + '" fill="' + theme.accent3 + '"/>',
        '<polygon points="' + starPoints(82, 78, 9, 4, 5) + '" fill="' + theme.accent3 + '"/>'
      ].join('');
    } else if (name === 'shell') {
      body = [
        '<path d="M18 78 C22 39 47 18 51 18 C56 18 80 39 84 78 Z" fill="' + theme.accent3 + '" stroke="' + theme.miniStroke + '" stroke-width="4"/>',
        '<path d="M51 20 V78 M33 36 C39 50 42 64 42 78 M69 36 C63 50 60 64 60 78" fill="none" stroke="' + theme.labelFill + '" stroke-width="4" stroke-linecap="round"/>',
        '<path d="M21 78 H82" stroke="' + theme.miniStroke + '" stroke-width="5" stroke-linecap="round"/>'
      ].join('');
    } else if (name === 'balloon') {
      body = [
        '<path d="M50 10 C72 10 82 30 77 49 C73 66 58 77 50 86 C42 77 27 66 23 49 C18 30 28 10 50 10 Z" fill="' + theme.accent + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<path d="M50 86 C47 92 45 95 40 98 H60 C55 95 53 92 50 86 Z" fill="' + theme.rewardStroke + '"/>',
        '<path d="M50 96 C39 84 64 80 51 67" fill="none" stroke="' + theme.text + '" stroke-width="3" stroke-linecap="round"/>',
        '<path d="M36 18 C29 30 29 44 37 55" fill="none" stroke="' + theme.labelFill + '" stroke-width="5" stroke-linecap="round" opacity="0.75"/>'
      ].join('');
    } else if (name === 'waves') {
      body = [
        '<path d="M8 36 C20 24 32 24 44 36 C56 48 68 48 80 36 C86 30 91 28 96 30" fill="none" stroke="' + theme.accent2 + '" stroke-width="8" stroke-linecap="round"/>',
        '<path d="M5 58 C17 46 29 46 41 58 C53 70 65 70 77 58 C84 51 91 49 97 53" fill="none" stroke="' + theme.pathOuter + '" stroke-width="8" stroke-linecap="round"/>',
        '<path d="M14 80 C28 68 42 68 56 80 C70 91 84 88 94 78" fill="none" stroke="' + theme.accent + '" stroke-width="8" stroke-linecap="round"/>'
      ].join('');
    } else if (name === 'treasure') {
      body = [
        '<path d="M18 45 C18 27 31 16 50 16 C69 16 82 27 82 45 V82 H18 Z" fill="' + theme.accent3 + '" stroke="' + theme.rewardStroke + '" stroke-width="4"/>',
        '<path d="M18 45 H82" stroke="' + theme.rewardStroke + '" stroke-width="5"/>',
        '<rect x="24" y="48" width="52" height="34" rx="5" fill="' + theme.accent + '" stroke="' + theme.rewardStroke + '" stroke-width="4"/>',
        '<circle cx="50" cy="61" r="7" fill="' + theme.labelFill + '" stroke="' + theme.rewardStroke + '" stroke-width="3"/>',
        '<path d="M32 35 H68" stroke="' + theme.labelFill + '" stroke-width="5" stroke-linecap="round" opacity="0.75"/>'
      ].join('');
    } else if (name === 'coin') {
      body = [
        '<ellipse cx="39" cy="67" rx="20" ry="13" fill="' + theme.accent3 + '" stroke="' + theme.miniStroke + '" stroke-width="4"/>',
        '<ellipse cx="57" cy="54" rx="22" ry="14" fill="' + theme.accent3 + '" stroke="' + theme.miniStroke + '" stroke-width="4"/>',
        '<circle cx="55" cy="40" r="21" fill="' + theme.miniFill + '" stroke="' + theme.miniStroke + '" stroke-width="4"/>',
        '<text x="55" y="50" text-anchor="middle" fill="' + theme.miniText + '" font-family="Arial, sans-serif" font-size="26" font-weight="900">$</text>'
      ].join('');
    } else if (name === 'castle') {
      body = [
        '<rect x="18" y="42" width="64" height="43" rx="4" fill="' + theme.backgroundAlt + '" stroke="' + theme.circleStroke + '" stroke-width="4"/>',
        '<rect x="24" y="27" width="15" height="58" fill="' + theme.labelFill + '" stroke="' + theme.circleStroke + '" stroke-width="4"/>',
        '<rect x="61" y="27" width="15" height="58" fill="' + theme.labelFill + '" stroke="' + theme.circleStroke + '" stroke-width="4"/>',
        '<path d="M23 27 L31.5 14 L40 27 Z M60 27 L68.5 14 L77 27 Z M38 42 L50 25 L62 42 Z" fill="' + theme.accent3 + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M44 85 V69 C44 61 56 61 56 69 V85" fill="' + theme.accent + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>'
      ].join('');
    } else if (name === 'flag') {
      body = [
        '<path d="M29 87 V17" stroke="' + theme.circleStroke + '" stroke-width="7" stroke-linecap="round"/>',
        '<path d="M32 19 C50 11 64 24 82 16 V55 C64 63 50 50 32 58 Z" fill="' + theme.accent + '" stroke="' + theme.rewardStroke + '" stroke-width="4"/>',
        '<path d="M40 25 C52 22 63 31 76 27" fill="none" stroke="' + theme.labelFill + '" stroke-width="5" stroke-linecap="round"/>'
      ].join('');
    } else if (name === 'shield') {
      body = [
        '<path d="M50 12 L82 25 V50 C82 69 69 82 50 91 C31 82 18 69 18 50 V25 Z" fill="' + theme.accent2 + '" stroke="' + theme.circleStroke + '" stroke-width="4"/>',
        '<path d="M50 18 V86" stroke="' + theme.labelFill + '" stroke-width="5"/>',
        '<path d="M24 48 H76" stroke="' + theme.labelFill + '" stroke-width="5"/>',
        '<polygon points="' + starPoints(50, 49, 13, 6, 5) + '" fill="' + theme.accent3 + '"/>'
      ].join('');
    } else if (name === 'crown') {
      body = [
        '<path d="M16 74 L24 32 L42 58 L51 22 L62 58 L78 32 L86 74 Z" fill="' + theme.accent3 + '" stroke="' + theme.miniStroke + '" stroke-width="4"/>',
        '<rect x="20" y="70" width="62" height="13" rx="6" fill="' + theme.accent + '" stroke="' + theme.miniStroke + '" stroke-width="4"/>',
        '<circle cx="24" cy="31" r="6" fill="' + theme.labelFill + '"/><circle cx="51" cy="22" r="6" fill="' + theme.labelFill + '"/><circle cx="78" cy="31" r="6" fill="' + theme.labelFill + '"/>'
      ].join('');
    } else if (name === 'gem') {
      body = [
        '<path d="M27 24 H73 L88 43 L50 88 L12 43 Z" fill="' + theme.accent2 + '" stroke="' + theme.circleStroke + '" stroke-width="4"/>',
        '<path d="M27 24 L39 43 L50 24 L61 43 L73 24 M12 43 H88 M39 43 L50 88 L61 43" fill="none" stroke="' + theme.labelFill + '" stroke-width="4" opacity="0.85"/>'
      ].join('');
    } else if (name === 'flower') {
      body = [
        '<path d="M50 54 C42 29 58 29 50 54 Z" fill="' + theme.accent + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M50 54 C25 44 33 30 50 54 Z" fill="' + theme.accent2 + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M50 54 C75 44 67 30 50 54 Z" fill="' + theme.accent2 + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M50 54 C37 75 24 63 50 54 Z" fill="' + theme.accent + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M50 54 C63 75 76 63 50 54 Z" fill="' + theme.accent + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<circle cx="50" cy="54" r="9" fill="' + theme.accent3 + '" stroke="' + theme.circleStroke + '" stroke-width="3"/>',
        '<path d="M50 63 V91" stroke="' + theme.accent2 + '" stroke-width="6" stroke-linecap="round"/>'
      ].join('');
    } else {
      body = [
        '<path d="M9 82 L32 48 L47 68 L67 35 L92 82 Z" fill="' + theme.backgroundAlt + '" stroke="' + theme.circleStroke + '" stroke-width="4"/>',
        '<path d="M32 48 L41 62 H25 Z M67 35 L77 52 H56 Z" fill="' + theme.labelFill + '"/>',
        '<path d="M12 84 H91" stroke="' + theme.circleStroke + '" stroke-width="5" stroke-linecap="round"/>',
        '<polygon points="' + starPoints(83, 20, 9, 4, 5) + '" fill="' + theme.accent3 + '"/>'
      ].join('');
    }

    return '<g transform="translate(' + boxNum(x) + ' ' + boxNum(y) + ') scale(' + boxNum(w / 100) + ' ' + boxNum(h / 100) + ')">' + body + '</g>';
  }

  function layoutText(text, maxWidth, preferredSize, minSize, maxLines) {
    var size = preferredSize;
    var lines = [];

    text = cleanText(text);
    if (!text) {
      return { lines: [], fontSize: preferredSize, lineHeight: Math.round(preferredSize * 1.14) };
    }

    while (size >= minSize) {
      lines = wrapText(text, maxWidth, size);
      if (lines.length <= maxLines) {
        return { lines: lines, fontSize: size, lineHeight: Math.round(size * 1.14) };
      }
      size -= 3;
    }

    lines = truncateLines(wrapText(text, maxWidth, minSize), maxLines, maxWidth, minSize);
    return { lines: lines, fontSize: minSize, lineHeight: Math.round(minSize * 1.14) };
  }

  function wrapText(text, maxWidth, fontSize) {
    var words = text.split(/\s+/);
    var lines = [];
    var current = '';

    words.forEach(function (word) {
      var next = current ? current + ' ' + word : word;
      if (current && approxTextWidth(next, fontSize, 700) > maxWidth) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    });

    if (current) lines.push(current);
    return lines;
  }

  function truncateLines(lines, maxLines, maxWidth, fontSize) {
    var trimmed = lines.slice(0, maxLines);
    var last;

    if (lines.length <= maxLines) return lines;
    last = trimmed[trimmed.length - 1] || '';

    while (last.length > 3 && approxTextWidth(last + '...', fontSize, 700) > maxWidth) {
      last = last.slice(0, -1);
    }

    trimmed[trimmed.length - 1] = last.replace(/\s+\S*$/, '') + '...';
    return trimmed;
  }

  function svgTextLines(lines, x, y, fontSize, lineHeight, fill, weight, anchor, halo) {
    var haloAttrs = halo ? ' stroke="' + halo + '" stroke-width="' + round(fontSize * 0.18) + '" stroke-linejoin="round" stroke-opacity="0.82" paint-order="stroke fill"' : '';

    if (!lines.length) return '';

    return [
      '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" fill="' + fill + '" font-family="Poppins, Arial, sans-serif" font-size="' + fontSize + '" font-weight="' + weight + '"' + haloAttrs + '>',
        lines.map(function (line, index) {
          return '<tspan x="' + x + '" dy="' + (index === 0 ? 0 : lineHeight) + '">' + escapeHtml(line) + '</tspan>';
        }).join(''),
      '</text>'
    ].join('');
  }

  function addStepObstacles(obstacles, points, radius, miniSet) {
    points.forEach(function (point) {
      var isFinal = point.index === points.length;
      var isMini = miniSet && miniSet[point.index] && !isFinal;
      var r = isFinal ? finalBadgeRadius(radius) * 1.65 : (isMini ? miniBadgeRadius(radius) * 1.32 : radius + 18);

      addBox(obstacles, { x: point.x - r, y: point.y - r, w: r * 2, h: r * 2 }, 0);
    });
  }

  function addPathObstacles(obstacles, points, pad) {
    for (var i = 0; i < points.length - 1; i += 1) {
      var a = points[i];
      var b = points[i + 1];
      addBox(obstacles, {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        w: Math.abs(a.x - b.x),
        h: Math.abs(a.y - b.y)
      }, pad);
    }
  }

  function addBox(obstacles, box, pad) {
    obstacles.push({
      x: box.x - pad,
      y: box.y - pad,
      w: box.w + pad * 2,
      h: box.h + pad * 2
    });
  }

  function collides(box, obstacles) {
    for (var i = 0; i < obstacles.length; i += 1) {
      if (intersects(box, obstacles[i])) return true;
    }
    return false;
  }

  function intersects(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function stepRadius(count) {
    if (count <= 8) return 112;
    if (count <= 16) return 104;
    if (count <= 30) return 92;
    if (count <= 40) return 78;
    return 66;
  }

  function normalizeMiniRewards(values, stepCount) {
    var seen = {};
    var rewards = [];

    if (!Array.isArray(values)) return rewards;

    values.forEach(function (value) {
      var step = parseInt(value, 10);
      if (step >= 1 && step < stepCount && !seen[step]) {
        seen[step] = true;
        rewards.push(step);
      }
    });

    return rewards.sort(function (a, b) {
      return a - b;
    });
  }

  function defaultGraphicSlots() {
    var slots = {};
    SLOT_DEFS.forEach(function (slot) {
      slots[slot.id] = true;
    });
    return slots;
  }

  function createDefaultState() {
    return normalizeState(clone(DEFAULT_STATE));
  }

  function loadState() {
    var saved;

    try {
      saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (error) {
      saved = null;
    }

    return normalizeState(saved || createDefaultState());
  }

  function normalizeState(value) {
    var base = clone(DEFAULT_STATE);
    var source = value && typeof value === 'object' ? value : {};

    base.childName = typeof source.childName === 'string' ? source.childName : base.childName;
    base.title = typeof source.title === 'string' ? source.title : base.title;
    base.subtitle = typeof source.subtitle === 'string' ? source.subtitle : base.subtitle;
    base.startLabel = typeof source.startLabel === 'string' ? source.startLabel : base.startLabel;
    base.rewardLabel = typeof source.rewardLabel === 'string' ? source.rewardLabel : base.rewardLabel;
    base.stepCount = clamp(parseInt(source.stepCount, 10) || base.stepCount, 1, 50);
    base.showNumbers = typeof source.showNumbers === 'boolean' ? source.showNumbers : base.showNumbers;
    base.showMiniLabels = typeof source.showMiniLabels === 'boolean' ? source.showMiniLabels : base.showMiniLabels;
    base.theme = hasTheme(source.theme) ? source.theme : base.theme;
    base.miniRewards = normalizeMiniRewards(source.miniRewards || base.miniRewards, base.stepCount);
    base.graphicSlots = defaultGraphicSlots();

    if (source.graphicSlots && typeof source.graphicSlots === 'object') {
      SLOT_DEFS.forEach(function (slot) {
        if (typeof source.graphicSlots[slot.id] === 'boolean') {
          base.graphicSlots[slot.id] = source.graphicSlots[slot.id];
        }
      });
    }

    return base;
  }

  function openUploadDb() {
    return new Promise(function (resolve) {
      var request;

      if (!window.indexedDB) {
        resolve(null);
        return;
      }

      request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function () {
        var db = request.result;
        if (!db.objectStoreNames.contains(DB_STORE)) {
          db.createObjectStore(DB_STORE, { keyPath: 'slot' });
        }
      };

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        resolve(null);
      };
    });
  }

  function loadUploads(db) {
    return new Promise(function (resolve) {
      var uploads = {};
      var transaction;
      var store;
      var request;

      if (!db) {
        resolve(uploads);
        return;
      }

      transaction = db.transaction(DB_STORE, 'readonly');
      store = transaction.objectStore(DB_STORE);

      if (store.getAll) {
        request = store.getAll();
        request.onsuccess = function () {
          (request.result || []).forEach(function (record) {
            if (record && record.slot && record.dataUrl) uploads[record.slot] = record;
          });
          resolve(uploads);
        };
        request.onerror = function () {
          resolve(uploads);
        };
      } else {
        request = store.openCursor();
        request.onsuccess = function () {
          var cursor = request.result;
          if (cursor) {
            if (cursor.value && cursor.value.slot && cursor.value.dataUrl) uploads[cursor.value.slot] = cursor.value;
            cursor.continue();
          } else {
            resolve(uploads);
          }
        };
        request.onerror = function () {
          resolve(uploads);
        };
      }
    });
  }

  function saveUpload(db, record) {
    return new Promise(function (resolve, reject) {
      var request;

      if (!db) {
        reject();
        return;
      }

      request = db.transaction(DB_STORE, 'readwrite').objectStore(DB_STORE).put(record);
      request.onsuccess = function () { resolve(); };
      request.onerror = function () { reject(); };
    });
  }

  function deleteUpload(db, slot) {
    return new Promise(function (resolve) {
      var request;

      if (!db) {
        resolve();
        return;
      }

      request = db.transaction(DB_STORE, 'readwrite').objectStore(DB_STORE).delete(slot);
      request.onsuccess = function () { resolve(); };
      request.onerror = function () { resolve(); };
    });
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = function () { reject(); };
      reader.readAsDataURL(file);
    });
  }

  function readControlValue(control) {
    if (control.type === 'checkbox') return control.checked;
    return control.value;
  }

  function readThemeAssetMap(root) {
    var node = root.querySelector('[data-flipzy-reward-assets]');

    if (!node) return {};

    try {
      return JSON.parse(node.textContent || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function getThemeWithAssets(id, assetMap) {
    var theme = clone(getTheme(id));
    var assets = assetMap && assetMap[theme.id] && typeof assetMap[theme.id] === 'object' ? assetMap[theme.id] : {};

    theme.assets = {};

    Object.keys(assets).forEach(function (key) {
      if (typeof assets[key] === 'string' && assets[key]) {
        theme.assets[key] = assets[key];
      }
    });

    return theme;
  }

  function getTheme(id) {
    for (var i = 0; i < THEMES.length; i += 1) {
      if (THEMES[i].id === id) return THEMES[i];
    }
    return THEMES[0];
  }

  function hasTheme(id) {
    return THEMES.some(function (theme) {
      return theme.id === id;
    });
  }

  function isKnownSlot(id) {
    return SLOT_DEFS.some(function (slot) {
      return slot.id === id;
    });
  }

  function toSet(values) {
    var set = {};
    values.forEach(function (value) {
      set[value] = true;
    });
    return set;
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function approxTextWidth(text, fontSize, weight) {
    var factor = weight >= 800 ? 0.61 : 0.55;
    return cleanText(text).length * fontSize * factor;
  }

  function starPoints(cx, cy, outer, inner, count) {
    var points = [];
    var total = count * 2;
    var angle;
    var radius;
    var i;

    for (i = 0; i < total; i += 1) {
      angle = -Math.PI / 2 + (Math.PI * 2 * i) / total;
      radius = i % 2 === 0 ? outer : inner;
      points.push(round(cx + Math.cos(angle) * radius) + ',' + round(cy + Math.sin(angle) * radius));
    }

    return points.join(' ');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function svgId(value) {
    return String(value || 'flipzy-reward').replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function round(value) {
    return Math.round(value * 10) / 10;
  }

  function boxNum(value) {
    return Math.round(value * 1000) / 1000;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function initRewardSystems(scope) {
    var roots = [];

    if (scope && scope.matches && scope.matches('[data-flipzy-reward-system]')) {
      roots.push(scope);
    }

    if (scope && scope.querySelectorAll) {
      Array.prototype.forEach.call(scope.querySelectorAll('[data-flipzy-reward-system]'), function (root) {
        roots.push(root);
      });
    }

    roots.forEach(function (root) {
      if (root.dataset.flipzyRewardSystemBound === 'true') return;
      root.dataset.flipzyRewardSystemBound = 'true';
      new RewardApp(root).init();
    });
  }

  window.FlipzyRewardSystem = {
    init: initRewardSystems
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initRewardSystems(document);
    });
  } else {
    initRewardSystems(document);
  }

  document.addEventListener('shopify:section:load', function (event) {
    initRewardSystems(event.target);
  });
})();
