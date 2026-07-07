(function () {
  'use strict';

  var STORAGE_KEY = 'flipzyRewardSystem.settings.v1';
  var BOARD = { width: 2100, height: 2970 };

  var DEFAULT_COPY = {
    defaults: {
      childName: 'Mia',
      title: "{{ child }}'s Reward Quest",
      subtitle: 'I earn each step by finishing my agreed routine with a calm body and a brave try.',
      startLabel: 'Start',
      rewardLabel: 'Family movie night'
    },
    themes: {
      castle: 'Castle Quest',
      princess: 'Princess Garden',
      garden: 'Playful Garden',
      space: 'Space Quest',
      ocean: 'Ocean Adventure',
      candy: 'Candy Parade',
      dino: 'Dino Trail'
    },
    status: {
      saved: 'Saved locally',
      saving: 'Saving...',
      storageFull: 'Storage is full',
      preparingPrint: 'Preparing print...',
      printReady: 'Print ready',
      printFailed: 'Print failed'
    },
    controls: {
      mainRewardStep: 'Main reward step'
    },
    poster: {
      posterAria: 'Reward poster',
      fallbackTitle: 'Reward Quest',
      forChild: 'For {{ child }}',
      miniReward: 'Mini reward',
      stickerDefaultName: 'Reward',
      stickersTitle: '{{ child }} stickers',
      stickerSubtitle: 'Cut-out circles for this reward poster'
    },
    print: {
      frameTitle: 'Reward poster print',
      documentTitle: 'Reward poster'
    }
  };

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
        miniRewardGift: 'coin'
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
        miniRewardGift: 'gem'
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
        miniRewardGift: 'miniGift'
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
        miniRewardGift: 'miniGift'
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
        miniRewardGift: 'shell'
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
        miniRewardGift: 'miniGift'
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
        miniRewardGift: 'leafSprig'
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
    miniRewards: [6, 12, 18]
  };

  function RewardApp(root) {
    this.root = root;
    this.instanceId = root.id || 'FlipzyRewardSystem-' + Math.floor(Math.random() * 1000000);
    this.poster = root.querySelector('[data-flipzy-poster]');
    this.saveStatus = root.querySelector('[data-flipzy-save-status]');
    this.stepPicker = root.querySelector('[data-flipzy-mini-step-picker]');
    this.themeButtons = root.querySelector('[data-flipzy-theme-buttons]');
    this.copy = mergeCopy(DEFAULT_COPY, readRewardCopy(root));
    this.state = loadState(this.copy);
    this.assetMap = readThemeAssetMap(root);
    this.saveTimer = null;
    this.statusTimer = null;
  }

  RewardApp.prototype.init = function () {
    this.populateThemes();
    this.bindEvents();
    this.renderFormState();
    this.renderMiniStepPicker();
    this.renderPoster();
  };

  RewardApp.prototype.populateThemes = function () {
    var self = this;
    var html;

    if (!this.themeButtons) return;

    html = THEMES.map(function (theme) {
      var name = themeName(theme, self.copy);

      return [
        '<button type="button" class="flipzy-rewards__theme-button" data-flipzy-theme="' + escapeAttr(theme.id) + '"',
          ' style="--theme-bg:' + escapeAttr(theme.backgroundAlt) + ';--theme-path:' + escapeAttr(theme.pathInner) + ';--theme-edge:' + escapeAttr(theme.pathOuter) + ';--theme-accent:' + escapeAttr(theme.accent) + ';--theme-accent-2:' + escapeAttr(theme.accent3) + '">',
          '<span class="flipzy-rewards__theme-swatch" aria-hidden="true">',
            '<span></span><span></span><span></span>',
          '</span>',
          '<span>' + escapeHtml(name) + '</span>',
        '</button>'
      ].join('');
    }).join('');

    this.themeButtons.innerHTML = html;
    this.syncThemeButtons();
  };

  RewardApp.prototype.bindEvents = function () {
    var self = this;

    this.root.addEventListener('input', function (event) {
      var control = event.target.closest('[data-flipzy-control]');
      if (!control || control.type === 'checkbox') return;
      self.handleControl(control);
    });

    this.root.addEventListener('change', function (event) {
      var control = event.target.closest('[data-flipzy-control]');

      if (control) {
        self.handleControl(control);
      }
    });

    this.root.addEventListener('click', function (event) {
      var preset = event.target.closest('[data-flipzy-mini-preset]');
      var step = event.target.closest('[data-flipzy-mini-step]');
      var themeButton = event.target.closest('[data-flipzy-theme]');
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

      if (themeButton) {
        self.setTheme(themeButton.getAttribute('data-flipzy-theme'));
        return;
      }

      if (printButton) {
        self.printPoster();
        return;
      }

      if (resetButton) {
        self.state = createDefaultState(self.copy);
        self.renderFormState();
        self.renderMiniStepPicker();
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
      this.state.theme = hasTheme(value) ? value : (DEFAULT_STATE.theme || 'castle');
    } else if (typeof this.state[key] === 'string') {
      this.state[key] = value;
    }

    this.persist();
    this.renderPoster();
  };

  RewardApp.prototype.setTheme = function (themeId) {
    if (!hasTheme(themeId) || themeId === this.state.theme) return;

    this.state.theme = themeId;
    this.syncThemeButtons();
    this.persist();
    this.renderPoster();
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

    this.syncThemeButtons();
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

  RewardApp.prototype.syncThemeButtons = function () {
    var self = this;

    if (!this.themeButtons) return;

    Array.prototype.forEach.call(this.themeButtons.querySelectorAll('[data-flipzy-theme]'), function (button) {
      var isActive = button.getAttribute('data-flipzy-theme') === self.state.theme;
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
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
        (i === count ? ' disabled title="' + escapeAttr(copyText(this.copy, 'controls.mainRewardStep', DEFAULT_COPY.controls.mainRewardStep)) + '"' : '') + '>' + i + '</button>'
      );
    }

    this.stepPicker.innerHTML = html.join('');
  };

  RewardApp.prototype.renderPoster = function () {
    if (!this.poster) return;
    this.poster.innerHTML = buildPosterSvg(this.state, this.instanceId, this.assetMap, this.copy);
  };

  RewardApp.prototype.printPoster = function () {
    var self = this;
    var svg = this.poster && this.poster.querySelector('svg');
    var stickerSvg = buildStickerSheetSvg(this.state, this.instanceId, this.assetMap, this.copy);
    var frame;
    var doc;
    var win;

    if (!svg) return;
    this.setStatusKey('preparingPrint');

    frame = document.createElement('iframe');
    frame.setAttribute('title', copyText(this.copy, 'print.frameTitle', DEFAULT_COPY.print.frameTitle));
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

    waitForSvgImages(svg.outerHTML + stickerSvg, window, 5000).then(function () {
      doc.open();
      doc.write([
        '<!doctype html>',
        '<html>',
          '<head>',
            '<meta charset="utf-8">',
            '<title>' + escapeHtml(copyText(self.copy, 'print.documentTitle', DEFAULT_COPY.print.documentTitle)) + '</title>',
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
      return waitForSvgImages(doc.body ? doc.body.innerHTML : '', win, 2500);
    }).then(function () {
      return waitForPaint(win);
    }).then(function () {
      self.setStatusKey('printReady');
      win.focus();
      win.print();
      window.setTimeout(function () {
        frame.remove();
      }, 1000);
    }).catch(function () {
      self.setStatusKey('printFailed');
      frame.remove();
      window.print();
    });
  };

  RewardApp.prototype.persist = function () {
    var self = this;

    window.clearTimeout(this.saveTimer);
    this.setStatusKey('saving');

    this.saveTimer = window.setTimeout(function () {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(self.state));
        self.setStatusKey('saved');
      } catch (error) {
        self.setStatusKey('storageFull');
      }
    }, 120);
  };

  RewardApp.prototype.setStatusKey = function (key) {
    this.setStatus(copyText(this.copy, 'status.' + key, DEFAULT_COPY.status[key] || key));
  };

  RewardApp.prototype.setStatus = function (message) {
    var self = this;
    var savedMessage = copyText(this.copy, 'status.saved', DEFAULT_COPY.status.saved);

    if (!this.saveStatus) return;

    this.saveStatus.textContent = message;
    window.clearTimeout(this.statusTimer);

    if (message !== savedMessage) {
      this.statusTimer = window.setTimeout(function () {
        self.saveStatus.textContent = savedMessage;
      }, 2200);
    }
  };

  function buildPosterSvg(state, instanceId, assetMap, copy) {
    var theme = getThemeWithAssets(state.theme, assetMap, copy);
    var radius = stepRadius(state.stepCount);
    var header = layoutHeader(state, theme, copy);
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
    var startLabel = layoutStartLabel(state, points[0], radius, header.box, copy);
    var miniSet = toSet(state.miniRewards);
    var miniLabels = buildMiniLabels(points, miniSet, state.showMiniLabels, radius, header.box, rewardLabel.box);
    var pathD = buildPath(points);
    var pathTextureId = theme.assets.pathTexture ? svgId(instanceId + '-' + theme.id + '-path-texture') : '';
    var finalRewardGraphic = {
      url: theme.assets.mainRewardGift || ''
    };
    var posterTitle = cleanText(state.title) || copyText(copy, 'poster.posterAria', DEFAULT_COPY.poster.posterAria);

    return [
      '<svg class="flipzy-rewards__poster-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + BOARD.width + ' ' + BOARD.height + '" role="img" aria-label="' + escapeAttr(posterTitle) + '">',
        '<title>' + escapeHtml(posterTitle) + '</title>',
        renderDefinitions(theme, pathTextureId),
        renderBackground(theme),
        renderRoad(pathD, radius, theme, pathTextureId),
        renderRoadDecor(points, radius, theme),
        header.svg,
        renderStartLabel(startLabel, theme),
        renderRewardLabel(rewardLabel, theme),
        renderSteps(points, radius, theme, miniSet, state.showNumbers, finalRewardGraphic),
        renderMiniLabels(miniLabels, theme, copy),
        state.showNumbers ? '' : renderFinalMarker(finalPoint, radius, theme),
      '</svg>'
    ].join('');
  }

  function buildStickerSheetSvg(state, instanceId, assetMap, copy) {
    var theme = getThemeWithAssets(state.theme, assetMap, copy);
    var radius = stepRadius(state.stepCount);
    var requested = state.stepCount + Math.max(8, Math.ceil(state.stepCount * 0.25));
    var layout = stickerSheetLayout(radius, requested);
    var stickerUrl = stickerAssetUrl(theme);
    var stickerChild = cleanText(state.childName) || copyText(copy, 'poster.stickerDefaultName', DEFAULT_COPY.poster.stickerDefaultName);
    var title = copyText(copy, 'poster.stickersTitle', DEFAULT_COPY.poster.stickersTitle, { child: stickerChild });
    var subtitle = copyText(copy, 'poster.stickerSubtitle', DEFAULT_COPY.poster.stickerSubtitle);
    var pieces = [
      '<svg class="flipzy-rewards__sticker-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + BOARD.width + ' ' + BOARD.height + '" role="img" aria-label="' + escapeAttr(title) + '">',
        '<title>' + escapeHtml(title) + '</title>',
        '<rect width="' + BOARD.width + '" height="' + BOARD.height + '" fill="#ffffff"/>',
        '<path d="M0 0 H' + BOARD.width + ' V260 C1700 345 1360 220 1030 310 C640 416 310 350 0 500 Z" fill="' + theme.backgroundAlt + '" opacity="0.42"/>',
        '<text x="1050" y="150" text-anchor="middle" fill="' + theme.title + '" font-family="Poppins, Arial, sans-serif" font-size="74" font-weight="900" stroke="' + theme.labelFill + '" stroke-width="12" stroke-linejoin="round" paint-order="stroke fill">' + escapeHtml(title) + '</text>',
        '<text x="1050" y="222" text-anchor="middle" fill="' + theme.text + '" font-family="Poppins, Arial, sans-serif" font-size="30" font-weight="800">' + escapeHtml(subtitle) + '</text>'
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
      pieces.push(svgImage(theme.assets.background, 'x="0" y="0" width="' + BOARD.width + '" height="' + BOARD.height + '" preserveAspectRatio="none"'));
    } else {
      pieces.push('<path d="M0 0 H' + BOARD.width + ' V330 C1710 430 1320 325 980 425 C610 532 285 470 0 610 Z" fill="' + theme.backgroundAlt + '" opacity="0.82"/>');
      pieces.push('<path d="M0 2790 C360 2630 720 2690 1050 2780 C1425 2884 1745 2860 2100 2700 V2970 H0 Z" fill="' + theme.backgroundBand + '" opacity="0.66"/>');
    }

    return pieces.join('');
  }

  function renderDefinitions(theme, pathTextureId) {
    if (!pathTextureId || !theme.assets.pathTexture) return '';

    return [
      '<defs>',
        '<pattern id="' + escapeAttr(pathTextureId) + '" patternUnits="userSpaceOnUse" width="800" height="220">',
          svgImage(theme.assets.pathTexture, 'x="0" y="0" width="800" height="220" preserveAspectRatio="none"'),
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

  function stickerAssetUrl(theme) {
    return theme.assets.sticker || theme.assets.miniRewardGift || theme.assets.mainRewardGift || '';
  }

  function renderSticker(cx, cy, radius, theme, stickerUrl, instanceId, index) {
    var clipId = svgId(instanceId + '-sticker-' + index);
    var artSize = round(radius * 2.46);
    var artBox = {
      x: round(cx - artSize / 2),
      y: round(cy - artSize / 2),
      w: artSize,
      h: artSize
    };
    var innerRadius = round(radius * 1.08);
    var pieces = [
      '<g>',
        '<clipPath id="' + escapeAttr(clipId) + '"><circle cx="' + round(cx) + '" cy="' + round(cy) + '" r="' + innerRadius + '"/></clipPath>'
    ];

    pieces.push('<g clip-path="url(#' + escapeAttr(clipId) + ')" opacity="' + (stickerUrl ? '0.72' : '1') + '">' + renderMotif(theme.motifs.miniRewardGift || 'miniGift', theme, artBox.x, artBox.y, artBox.w, artBox.h) + '</g>');

    if (stickerUrl) {
      pieces.push(svgImage(stickerUrl, 'x="' + artBox.x + '" y="' + artBox.y + '" width="' + artBox.w + '" height="' + artBox.h + '" preserveAspectRatio="xMidYMid meet" clip-path="url(#' + escapeAttr(clipId) + ')"'));
    }

    pieces.push('</g>');

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

  function renderSteps(points, radius, theme, miniSet, showNumbers, finalRewardGraphic) {
    return points.map(function (point) {
      var isFinal = point.index === points.length;
      var isMini = !!miniSet[point.index] && !isFinal;
      var r = isFinal ? finalBadgeRadius(radius) : (isMini ? miniBadgeRadius(radius) : radius);
      var fill = isFinal ? theme.circleFill : (isMini ? theme.miniFill : theme.circleFill);
      var stroke = isFinal ? theme.circleStroke : (isMini ? theme.miniStroke : theme.circleStroke);
      var text = isFinal ? theme.circleText : (isMini ? theme.miniText : theme.circleText);
      var strokeWidth = isFinal ? 15 : (isMini ? 13 : 11);
      var textStroke = isFinal ? ' stroke="' + theme.labelFill + '" stroke-width="' + round(r * 0.08) + '" stroke-linejoin="round" paint-order="stroke fill"' : '';
      var pieces = [
        isFinal ? '<polygon points="' + starPoints(point.x, point.y, r * 1.64, r * 1.17, 22) + '" fill="' + theme.accent3 + '" opacity="0.92"/>' : '',
        isMini ? '<polygon points="' + starPoints(point.x, point.y, r * 1.32, r * 1.08, 14) + '" fill="' + theme.accent3 + '" opacity="0.42"/>' : '',
        isFinal ? '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + round(r * 1.28) + '" fill="' + theme.accent3 + '" opacity="0.18"/>' : '',
        isFinal ? renderFinalRewardIcon(point, r, theme, finalRewardGraphic && finalRewardGraphic.url) : '',
        isFinal ? renderFinalRewardRibbons(point, r, theme) : '',
        '<circle cx="' + (point.x + (isFinal ? 11 : 8)) + '" cy="' + (point.y + (isFinal ? 15 : 12)) + '" r="' + r + '" fill="#000000" opacity="' + (isFinal ? 0.18 : (isMini ? 0.15 : 0.12)) + '"/>',
        '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '"/>',
        isFinal ? '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + round(r - strokeWidth * 0.9) + '" fill="none" stroke="' + theme.accent3 + '" stroke-width="7" opacity="0.95"/>' : '',
        isMini ? '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + round(r - strokeWidth * 0.7) + '" fill="none" stroke="' + theme.labelFill + '" stroke-width="5" opacity="0.62"/>' : ''
      ];

      if (isMini) {
        pieces.push('<polygon points="' + starPoints(point.x + r * 0.52, point.y - r * 0.52, r * 0.25, r * 0.11, 5) + '" fill="' + theme.accent2 + '" stroke="' + stroke + '" stroke-width="5"/>');
      }

      if (showNumbers) {
        pieces.push('<text x="' + point.x + '" y="' + point.y + '" text-anchor="middle" dominant-baseline="middle" fill="' + text + '" font-family="Poppins, Arial, sans-serif" font-size="' + round(r * (isFinal ? 0.72 : 0.76)) + '" font-weight="900"' + textStroke + '>' + point.index + '</text>');
      } else if (isMini) {
        pieces.push('<polygon points="' + starPoints(point.x, point.y, r * 0.32, r * 0.15, 5) + '" fill="' + text + '" opacity="0.9"/>');
      }

      return '<g>' + pieces.join('') + '</g>';
    }).join('');
  }

  function renderFinalRewardIcon(point, radius, theme, assetUrl) {
    var size = round(clamp(radius * 1.42, 144, 230));
    var cx = clamp(point.x - radius * 1.02, 90 + size / 2, BOARD.width - 90 - size / 2);
    var cy = clamp(point.y - radius * 1.05, 90 + size / 2, BOARD.height - 90 - size / 2);
    var x = round(cx - size / 2);
    var y = round(cy - size / 2);
    var artPad = round(size * 0.04);
    var motif = theme.motifs.mainRewardGift || 'gift';
    var art;

    if (assetUrl) {
      art = svgImage(assetUrl, 'x="' + round(x + artPad) + '" y="' + round(y + artPad) + '" width="' + round(size - artPad * 2) + '" height="' + round(size - artPad * 2) + '" preserveAspectRatio="xMidYMid meet"');
    } else {
      art = renderMotif(motif, theme, x + artPad, y + artPad, size - artPad * 2, size - artPad * 2);
    }

    return [
      '<g opacity="0.98">',
        '<circle cx="' + round(cx + size * 0.05) + '" cy="' + round(cy + size * 0.07) + '" r="' + round(size * 0.47) + '" fill="#000000" opacity="0.12"/>',
        '<polygon points="' + starPoints(cx, cy, size * 0.58, size * 0.44, 14) + '" fill="' + theme.accent3 + '" opacity="0.92"/>',
        '<circle cx="' + round(cx) + '" cy="' + round(cy) + '" r="' + round(size * 0.43) + '" fill="' + theme.labelFill + '" stroke="' + theme.labelStroke + '" stroke-width="6"/>',
        art,
        '<polygon points="' + starPoints(cx + size * 0.34, cy - size * 0.36, size * 0.15, size * 0.06, 5) + '" fill="' + theme.accent2 + '" stroke="' + theme.labelFill + '" stroke-width="3"/>',
      '</g>'
    ].join('');
  }

  function renderFinalRewardRibbons(point, radius, theme) {
    var left = [
      round(point.x - radius * 0.58) + ' ' + round(point.y + radius * 0.56),
      round(point.x - radius * 0.14) + ' ' + round(point.y + radius * 0.56),
      round(point.x - radius * 0.2) + ' ' + round(point.y + radius * 1.17),
      round(point.x - radius * 0.36) + ' ' + round(point.y + radius * 0.99),
      round(point.x - radius * 0.55) + ' ' + round(point.y + radius * 1.18)
    ].join(' ');
    var right = [
      round(point.x + radius * 0.14) + ' ' + round(point.y + radius * 0.56),
      round(point.x + radius * 0.58) + ' ' + round(point.y + radius * 0.56),
      round(point.x + radius * 0.55) + ' ' + round(point.y + radius * 1.18),
      round(point.x + radius * 0.36) + ' ' + round(point.y + radius * 0.99),
      round(point.x + radius * 0.2) + ' ' + round(point.y + radius * 1.17)
    ].join(' ');

    return [
      '<g opacity="0.96">',
        '<polygon points="' + left + '" fill="' + theme.accent3 + '" stroke="' + theme.circleStroke + '" stroke-width="5" stroke-linejoin="round"/>',
        '<polygon points="' + right + '" fill="' + theme.accent2 + '" stroke="' + theme.circleStroke + '" stroke-width="5" stroke-linejoin="round"/>',
      '</g>'
    ].join('');
  }

  function renderFinalMarker(point, radius, theme) {
    var r = finalBadgeRadius(radius) * 0.82;
    var x = point.x - r * 0.38;
    var y = point.y - r * 0.28;
    var w = r * 0.76;
    var h = r * 0.58;

    return [
      '<g opacity="0.96">',
        '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + round(r * 0.1) + '" fill="none" stroke="' + theme.circleText + '" stroke-width="8"/>',
        '<path d="M' + (x + w * 0.5) + ' ' + y + ' V' + (y + h) + '" stroke="' + theme.circleText + '" stroke-width="8" stroke-linecap="round"/>',
        '<path d="M' + x + ' ' + (y + h * 0.34) + ' H' + (x + w) + '" stroke="' + theme.circleText + '" stroke-width="8" stroke-linecap="round"/>',
      '</g>'
    ].join('');
  }

  function renderMiniLabels(labels, theme, copy) {
    var labelText = copyText(copy, 'poster.miniReward', DEFAULT_COPY.poster.miniReward);

    return labels.map(function (label) {
      return [
        '<g>',
          '<rect x="' + (label.box.x + 5) + '" y="' + (label.box.y + 7) + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="27" fill="#000000" opacity="0.12"/>',
          '<rect x="' + label.box.x + '" y="' + label.box.y + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="27" fill="' + theme.miniFill + '" stroke="' + theme.miniStroke + '" stroke-width="5"/>',
          '<rect x="' + (label.box.x + 13) + '" y="' + (label.box.y + 10) + '" width="' + (label.box.w - 26) + '" height="' + round(label.box.h * 0.32) + '" rx="13" fill="' + theme.labelFill + '" opacity="0.38"/>',
          '<text x="' + (label.box.x + label.box.w / 2) + '" y="' + (label.box.y + label.box.h / 2 + 11) + '" text-anchor="middle" fill="' + theme.miniText + '" font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="900">' + escapeHtml(labelText) + '</text>',
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
    if (!label.visible) return '';

    var centerY = label.box.y + label.box.h / 2 - ((label.lines.length - 1) * label.lineHeight) / 2;
    var iconCx = label.box.x + label.box.h * 0.5;
    var iconCy = label.box.y + label.box.h * 0.5;

    return [
      '<g>',
        '<rect x="' + (label.box.x + 7) + '" y="' + (label.box.y + 10) + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="' + round(label.box.h / 2) + '" fill="#000000" opacity="0.16"/>',
        '<rect x="' + label.box.x + '" y="' + label.box.y + '" width="' + label.box.w + '" height="' + label.box.h + '" rx="' + round(label.box.h / 2) + '" fill="' + theme.labelFill + '" stroke="' + theme.circleStroke + '" stroke-width="7"/>',
        '<rect x="' + (label.box.x + 18) + '" y="' + (label.box.y + 14) + '" width="' + (label.box.w - 36) + '" height="' + round(label.box.h * 0.3) + '" rx="' + round(label.box.h * 0.15) + '" fill="' + theme.accent3 + '" opacity="0.24"/>',
        '<circle cx="' + round(iconCx) + '" cy="' + round(iconCy) + '" r="' + round(label.box.h * 0.34) + '" fill="' + theme.accent3 + '" stroke="' + theme.miniStroke + '" stroke-width="4"/>',
        '<polygon points="' + starPoints(iconCx, iconCy, label.box.h * 0.2, label.box.h * 0.09, 5) + '" fill="' + theme.labelFill + '" opacity="0.95"/>',
        label.lines.map(function (line, index) {
          return '<text x="' + round(label.box.x + label.box.w / 2 + label.box.h * 0.14) + '" y="' + round(centerY + index * label.lineHeight) + '" text-anchor="middle" dominant-baseline="middle" fill="' + theme.title + '" stroke="' + theme.labelFill + '" stroke-width="' + round(label.fontSize * 0.09) + '" stroke-linejoin="round" paint-order="stroke fill" font-family="Poppins, Arial, sans-serif" font-size="' + label.fontSize + '" font-weight="900">' + escapeHtml(line) + '</text>';
        }).join(''),
      '</g>'
    ].join('');
  }

  function layoutHeader(state, theme, copy) {
    var child = cleanText(state.childName);
    var title = cleanText(state.title) || copyText(copy, 'poster.fallbackTitle', DEFAULT_COPY.poster.fallbackTitle);
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
      var badgeText = copyText(copy, 'poster.forChild', DEFAULT_COPY.poster.forChild, { child: child });
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
    var text = cleanText(state.rewardLabel);
    if (!text) {
      return {
        visible: false,
        box: { x: 0, y: BOARD.height + 1000, w: 0, h: 0 },
        lines: [],
        fontSize: 0,
        lineHeight: 0
      };
    }

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
      visible: true,
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

  function layoutStartLabel(state, point, radius, headerBox, copy) {
    var text = cleanText(state.startLabel) || copyText(copy, 'defaults.startLabel', DEFAULT_COPY.defaults.startLabel);
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
      var controls = pathControls(p1, p2, dx, dy, i);

      path += ' C' + round(controls.c1x) + ' ' + round(controls.c1y) + ' ' + round(controls.c2x) + ' ' + round(controls.c2y) + ' ' + p2.x + ' ' + p2.y;
    }

    return path;
  }

  function pathControls(p1, p2, dx, dy, index) {
    var wave = ((index % 2 === 0) ? 1 : -1) * clamp(Math.abs(dx) * 0.035, 8, 28);
    var side;
    var turn;

    if (p1.row === p2.row) {
      return {
        c1x: p1.x + dx * 0.38,
        c1y: p1.y + wave,
        c2x: p2.x - dx * 0.38,
        c2y: p2.y + wave
      };
    }

    side = p1.x > BOARD.width / 2 ? 1 : -1;
    turn = clamp(Math.abs(dy) * 0.38, 185, 230);

    return {
      c1x: clamp(p1.x + side * turn, 170, BOARD.width - 170),
      c1y: p1.y,
      c2x: clamp(p2.x + side * turn, 170, BOARD.width - 170),
      c2y: p2.y
    };
  }

  function svgImage(url, attrs) {
    var safeUrl = escapeAttr(url);
    var xlink = String(url || '').indexOf('data:') === 0 ? '' : ' xlink:href="' + safeUrl + '"';

    return '<image href="' + safeUrl + '"' + xlink + ' ' + attrs + '/>';
  }

  function waitForSvgImages(markup, win, timeout) {
    return preloadImageUrls(extractSvgImageUrls(markup), win || window, timeout || 3500);
  }

  function extractSvgImageUrls(markup) {
    var seen = {};
    var urls = [];
    var regex = /\b(?:href|xlink:href)=["']([^"']+)["']/g;
    var match;

    while ((match = regex.exec(markup || ''))) {
      var url = normalizeAssetUrl(match[1]);
      if (!url || seen[url]) continue;
      seen[url] = true;
      urls.push(url);
    }

    return urls;
  }

  function preloadImageUrls(urls, win, timeout) {
    return new Promise(function (resolve) {
      var imageWindow = win || window;
      var ImageCtor = imageWindow.Image || window.Image;
      var images = [];
      var remaining = urls.length;
      var finished = false;
      var timer;

      if (!remaining || !ImageCtor) {
        resolve();
        return;
      }

      function done() {
        if (finished) return;
        remaining -= 1;
        if (remaining <= 0) {
          finished = true;
          window.clearTimeout(timer);
          resolve();
        }
      }

      timer = window.setTimeout(function () {
        finished = true;
        resolve();
      }, timeout);

      urls.forEach(function (url) {
        var img = new ImageCtor();
        var settled = false;
        var settle = function () {
          if (settled) return;
          settled = true;
          done();
        };

        images.push(img);
        img.onload = settle;
        img.onerror = settle;
        img.src = url;
        if (img.complete) settle();
      });
    });
  }

  function waitForPaint(win) {
    return new Promise(function (resolve) {
      var target = win || window;
      var raf = target.requestAnimationFrame || function (callback) { target.setTimeout(callback, 60); };

      raf(function () {
        raf(function () {
          target.setTimeout(resolve, 80);
        });
      });
    });
  }

  function normalizeAssetUrl(url) {
    var normalized = String(url || '')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    if (!normalized || normalized.charAt(0) === '#') return '';
    if (normalized.indexOf('//') === 0) return window.location.protocol + normalized;
    if (normalized.charAt(0) === '/') return window.location.origin + normalized;

    return normalized;
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

  function createDefaultState(copy) {
    return normalizeState(localizedDefaultState(copy), copy);
  }

  function loadState(copy) {
    var saved;

    try {
      saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (error) {
      saved = null;
    }

    return normalizeState(saved || createDefaultState(copy), copy);
  }

  function normalizeState(value, copy) {
    var base = localizedDefaultState(copy);
    var source = value && typeof value === 'object' ? value : {};

    base.childName = sourceTextValue(source, base, 'childName');
    base.title = sourceTextValue(source, base, 'title');
    base.subtitle = sourceTextValue(source, base, 'subtitle');
    base.startLabel = sourceTextValue(source, base, 'startLabel');
    base.rewardLabel = sourceTextValue(source, base, 'rewardLabel');
    base.stepCount = clamp(parseInt(source.stepCount, 10) || base.stepCount, 1, 50);
    base.showNumbers = typeof source.showNumbers === 'boolean' ? source.showNumbers : base.showNumbers;
    base.showMiniLabels = typeof source.showMiniLabels === 'boolean' ? source.showMiniLabels : base.showMiniLabels;
    base.theme = hasTheme(source.theme) ? source.theme : base.theme;
    base.miniRewards = normalizeMiniRewards(source.miniRewards || base.miniRewards, base.stepCount);

    return base;
  }

  function localizedDefaultState(copy) {
    var base = clone(DEFAULT_STATE);

    base.childName = copyText(copy, 'defaults.childName', DEFAULT_COPY.defaults.childName);
    base.title = copyText(copy, 'defaults.title', DEFAULT_COPY.defaults.title, { child: base.childName });
    base.subtitle = copyText(copy, 'defaults.subtitle', DEFAULT_COPY.defaults.subtitle);
    base.startLabel = copyText(copy, 'defaults.startLabel', DEFAULT_COPY.defaults.startLabel);
    base.rewardLabel = copyText(copy, 'defaults.rewardLabel', DEFAULT_COPY.defaults.rewardLabel);
    return base;
  }

  function sourceTextValue(source, base, key) {
    if (typeof source[key] !== 'string') return base[key];
    if (source[key] === DEFAULT_STATE[key] && base[key] !== DEFAULT_STATE[key]) return base[key];
    return source[key];
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

  function readRewardCopy(root) {
    var node = root.querySelector('[data-flipzy-reward-copy]');

    if (!node) return {};

    try {
      return JSON.parse(node.textContent || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function mergeCopy(base, override) {
    var result = clone(base || {});

    mergeObject(result, override || {});
    return result;
  }

  function mergeObject(target, source) {
    Object.keys(source || {}).forEach(function (key) {
      var value = source[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
          target[key] = {};
        }
        mergeObject(target[key], value);
      } else if (typeof value === 'string') {
        target[key] = value;
      }
    });
  }

  function copyText(copy, path, fallback, replacements) {
    var parts = String(path || '').split('.');
    var value = copy || {};

    for (var i = 0; i < parts.length; i += 1) {
      if (!value || typeof value !== 'object' || typeof value[parts[i]] === 'undefined') {
        value = null;
        break;
      }
      value = value[parts[i]];
    }

    if (typeof value !== 'string' || !value) value = fallback || '';
    return formatCopy(value, replacements);
  }

  function formatCopy(value, replacements) {
    var output = String(value || '');

    Object.keys(replacements || {}).forEach(function (key) {
      var escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var token = new RegExp('{{\\s*' + escapedKey + '\\s*}}', 'g');
      var bracketToken = new RegExp('\\[\\[\\s*' + escapedKey + '\\s*\\]\\]', 'g');

      output = output.replace(token, replacements[key]).replace(bracketToken, replacements[key]);
    });

    return output;
  }

  function getThemeWithAssets(id, assetMap, copy) {
    var theme = clone(getTheme(id));
    var assets = assetMap && assetMap[theme.id] && typeof assetMap[theme.id] === 'object' ? assetMap[theme.id] : {};

    theme.assets = {};
    theme.name = themeName(theme, copy);

    Object.keys(assets).forEach(function (key) {
      if (typeof assets[key] === 'string' && assets[key]) {
        theme.assets[key] = assets[key];
      }
    });

    return theme;
  }

  function themeName(theme, copy) {
    return copyText(copy, 'themes.' + theme.id, theme.name);
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
