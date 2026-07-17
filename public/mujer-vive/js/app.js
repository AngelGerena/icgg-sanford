// ============================================================
// MUJER VIVE — Public order flow (Netlify Forms version)
// Bilingual ES/EN · Payment-launch guardrail · Auto-copy memo
// ============================================================
(function () {
  // ---------- Translations ----------
  const I18N = {
    es: {
      offerTag: 'Oferta de<br>lanzamiento',
      formTitle: 'Separa tu manual',
      lName: 'Nombre completo', lPhone: 'Teléfono', lEmail: 'Correo electrónico',
      lAddr: 'Dirección de envío', lCity: 'Ciudad', lState: 'Estado', lZip: 'Código postal', lQty: 'Cantidad',
      eName: 'Escribe tu nombre completo.', ePhone: 'Escribe un teléfono válido.', eEmail: 'Escribe un correo válido.',
      eAddr1: 'Escribe tu dirección.', eCity: 'Requerido.', eState: 'Requerido.', eZip: 'Requerido.',
      ctaLabel: 'Continuar al pago',
      shipIncluded: 'Envío incluido en el precio.',
      shipExtra: 'Más {fee} de envío por orden.',
      verse: '\u201CPorque donde Dios da una asignación, también derrama la unción para cumplirla.\u201D',
      verseRef: 'BASADO EN JUECES 4\u20135', verseRef2: 'MUJER VIVE \u00B7 JUECES 4\u20135',
      payTitle: 'Completa tu pago', payOrderWord: 'Orden',
      copyPayLbl: 'Copiar número de orden', copied: '\u00A1Copiado!',
      totalLbl: 'Total a pagar',
      detailOne: '1 manual \u00D7 {p} \u00B7 {ship}', detailMany: '{n} manuales \u00D7 {p} \u00B7 {ship}',
      shipInc: 'envío incluido', shipPlus: '+ {fee} envío',
      payZelle: 'Pagar con Zelle', payCash: 'Pagar con Cash App',
      zelleHint: 'Se abrirá la app de tu banco con <b>{name}</b> como destinataria. Envía <b>{total}</b> y pega tu número de orden en el memo — ya estará copiado.',
      cashHint: 'Se abrirá Cash App con el monto de <b>{total}</b> listo para <b>{tag}</b>. Pega tu número de orden en la nota — ya estará copiado.',
      qrAsk: '\u00BFEstás viendo esto en una computadora?',
      qrSub: 'Escanéalo con la cámara de tu teléfono.',
      fallbackZelle: 'O envía manualmente por Zelle a: <b>{num}</b> \u00B7 {name}',
      fallbackCash: 'O envía manualmente en Cash App a: <b>{tag}</b>',
      verifyLbl: 'Tu número de orden',
      checkLbl: 'Ya envié mi pago con mi número de orden en el memo',
      btnPaid: 'Ya envié mi pago',
      btnBack: 'Volver a mi orden',
      toast: 'Número de orden copiado — pégalo en la nota o memo',
      submitErr: 'No pudimos registrar tu orden. Verifica tu conexión e intenta de nuevo.',
      doneTitle: '\u00A1Tu orden está separada!', doneOrderWord: 'ORDEN', copyDoneLbl: 'Copiar',
      doneTxt: 'Recibimos tu orden y estamos verificando tu pago. Te contactaremos cuando tu manual esté en camino. \u00A1Gracias por sembrar en este proyecto!',
      modalTitle: 'Un momento',
      modalBodyZelle: 'Para completar tu orden, primero abre <b>Zelle</b> y envía tu pago de <b>{total}</b>.',
      modalBodyCash: 'Para completar tu orden, primero abre <b>Cash App</b> y envía tu pago de <b>{total}</b>.',
      modalFine: 'Cada transacción es debidamente verificada antes del envío de su manual.',
      modalOpenZelle: 'Abrir Zelle', modalOpenCash: 'Abrir Cash App',
      modalAlt: 'Ya pagué de otra forma — continuar',
      waitNote: 'Verificando tu pago — podrás confirmar en {time}',
      waitAlmost: 'Un momento más…'
    },
    en: {
      offerTag: 'Launch<br>offer',
      formTitle: 'Reserve your copy',
      lName: 'Full name', lPhone: 'Phone', lEmail: 'Email address',
      lAddr: 'Shipping address', lCity: 'City', lState: 'State', lZip: 'ZIP code', lQty: 'Quantity',
      eName: 'Please enter your full name.', ePhone: 'Please enter a valid phone number.', eEmail: 'Please enter a valid email.',
      eAddr1: 'Please enter your address.', eCity: 'Required.', eState: 'Required.', eZip: 'Required.',
      ctaLabel: 'Continue to payment',
      shipIncluded: 'Shipping included in the price.',
      shipExtra: 'Plus {fee} shipping per order.',
      verse: '\u201CFor where God gives an assignment, He also pours out the anointing to fulfill it.\u201D',
      verseRef: 'BASED ON JUDGES 4\u20135', verseRef2: 'MUJER VIVE \u00B7 JUDGES 4\u20135',
      payTitle: 'Complete your payment', payOrderWord: 'Order',
      copyPayLbl: 'Copy order number', copied: 'Copied!',
      totalLbl: 'Total due',
      detailOne: '1 book \u00D7 {p} \u00B7 {ship}', detailMany: '{n} books \u00D7 {p} \u00B7 {ship}',
      shipInc: 'shipping included', shipPlus: '+ {fee} shipping',
      payZelle: 'Pay with Zelle', payCash: 'Pay with Cash App',
      zelleHint: 'Your bank\u2019s app will open with <b>{name}</b> set as the recipient. Send <b>{total}</b> and paste your order number in the memo — it\u2019s already copied.',
      cashHint: 'Cash App will open with <b>{total}</b> ready for <b>{tag}</b>. Paste your order number in the note — it\u2019s already copied.',
      qrAsk: 'Viewing this on a computer?',
      qrSub: 'Scan it with your phone camera.',
      fallbackZelle: 'Or send manually via Zelle to: <b>{num}</b> \u00B7 {name}',
      fallbackCash: 'Or send manually on Cash App to: <b>{tag}</b>',
      verifyLbl: 'Your order number',
      checkLbl: 'I sent my payment with my order number in the memo',
      btnPaid: 'I sent my payment',
      btnBack: 'Back to my order',
      toast: 'Order number copied — paste it in the note or memo',
      submitErr: 'We couldn\u2019t record your order. Check your connection and try again.',
      doneTitle: 'Your order is reserved!', doneOrderWord: 'ORDER', copyDoneLbl: 'Copy',
      doneTxt: 'We received your order and are verifying your payment. We\u2019ll contact you when your book is on its way. Thank you for sowing into this project!',
      modalTitle: 'One moment',
      modalBodyZelle: 'To complete your order, please open <b>Zelle</b> first and send your payment of <b>{total}</b>.',
      modalBodyCash: 'To complete your order, please open <b>Cash App</b> first and send your payment of <b>{total}</b>.',
      modalFine: 'Each transaction is properly verified before your book is shipped.',
      modalOpenZelle: 'Open Zelle', modalOpenCash: 'Open Cash App',
      modalAlt: 'I paid another way — continue',
      waitNote: 'Verifying your payment — you can confirm in {time}',
      waitAlmost: 'One more moment…'
    }
  };

  const state = {
    lang: 'es',
    qty: 1,
    unitPrice: MV_CONFIG.LAUNCH_ACTIVE ? MV_CONFIG.LAUNCH_PRICE : MV_CONFIG.REGULAR_PRICE,
    orderNumber: null,
    method: 'zelle',
    launchedPay: false,
    launchTime: 0,     // when they tapped Pagar con Zelle / Cash App
    payStepTime: 0,    // when the payment screen opened (anchor for "paid another way")
    preliminarySent: false
  };

  try {
    const saved = localStorage.getItem('mv_lang');
    if (saved === 'en' || saved === 'es') state.lang = saved;
  } catch (e) { /* private mode */ }

  const $ = (id) => document.getElementById(id);
  const t = (key, vars) => {
    let s = I18N[state.lang][key] || I18N.es[key] || '';
    if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  };
  const busy = (on) => $('busy').classList.toggle('on', on);
  const money = (n) => '$' + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, '');

  // ---------- Pricing ----------
  function orderTotal() {
    let tot = state.qty * state.unitPrice;
    if (!MV_CONFIG.SHIPPING_INCLUDED) tot += Number(MV_CONFIG.SHIPPING_FLAT || 0);
    return tot;
  }

  function renderPrice() {
    $('priceOld').textContent = money(MV_CONFIG.REGULAR_PRICE);
    $('priceNew').textContent = money(state.unitPrice);
    $('priceBadge').classList.toggle('regular', !MV_CONFIG.LAUNCH_ACTIVE);
    $('qtyVal').textContent = state.qty;
    $('ctaTotal').textContent = money(orderTotal());
    $('shipNote').textContent = MV_CONFIG.SHIPPING_INCLUDED
      ? t('shipIncluded')
      : t('shipExtra', { fee: money(MV_CONFIG.SHIPPING_FLAT) });
  }

  // ---------- Language ----------
  function applyLang() {
    document.documentElement.lang = state.lang;
    $('langEs').classList.toggle('on', state.lang === 'es');
    $('langEn').classList.toggle('on', state.lang === 'en');

    $('priceTag').innerHTML = t('offerTag');
    $('formTitle').textContent = t('formTitle');
    ['lName', 'lPhone', 'lEmail', 'lAddr', 'lCity', 'lState', 'lZip', 'lQty'].forEach((k) => { $(k).textContent = t(k); });
    ['eName', 'ePhone', 'eEmail', 'eAddr1', 'eCity', 'eState', 'eZip'].forEach((k) => { $(k).textContent = t(k); });
    $('ctaLabel').textContent = t('ctaLabel');
    $('verseText').textContent = t('verse');
    $('verseText2').textContent = t('verse');
    $('verseRef').textContent = t('verseRef');
    $('verseRef2').textContent = t('verseRef2');

    $('payTitle').textContent = t('payTitle');
    $('payOrderWord').textContent = t('payOrderWord');
    $('copyPayLbl').textContent = t('copyPayLbl');
    $('totalLbl').textContent = t('totalLbl');
    $('qrAsk').textContent = t('qrAsk');
    $('qrSub').textContent = t('qrSub');
    $('verifyLbl').textContent = t('verifyLbl');
    $('checkLbl').textContent = t('checkLbl');
    $('btnPaid').textContent = t('btnPaid');
    $('btnBack').textContent = t('btnBack');
    $('toast').textContent = t('toast');

    $('doneTitle').textContent = t('doneTitle');
    $('doneOrderWord').textContent = t('doneOrderWord');
    $('copyDoneLbl').textContent = t('copyDoneLbl');
    $('doneTxt').textContent = t('doneTxt');

    $('modalTitle').textContent = t('modalTitle');
    $('modalAlt').textContent = t('modalAlt');

    renderPrice();
    if (state.orderNumber) renderPaymentTexts();
  }

  function setLang(lang) {
    state.lang = lang;
    try { localStorage.setItem('mv_lang', lang); } catch (e) { /* private mode */ }
    applyLang();
  }

  $('langEs').addEventListener('click', () => setLang('es'));
  $('langEn').addEventListener('click', () => setLang('en'));

  // ---------- Order number ----------
  function makeOrderNumber() {
    const d = new Date();
    const mmdd = String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    const rand = String(Math.floor(1000 + Math.random() * 9000));
    return 'MV-' + mmdd + '-' + rand;
  }

  // ---------- Quantity ----------
  $('qtyMinus').addEventListener('click', () => { if (state.qty > 1) { state.qty--; renderPrice(); } });
  $('qtyPlus').addEventListener('click', () => { if (state.qty < 20) { state.qty++; renderPrice(); } });

  // ---------- Validation ----------
  const fields = [
    { id: 'fName',  test: (v) => v.trim().length >= 3 },
    { id: 'fPhone', test: (v) => v.replace(/\D/g, '').length >= 10 },
    { id: 'fEmail', test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'fAddr1', test: (v) => v.trim().length >= 5 },
    { id: 'fCity',  test: (v) => v.trim().length >= 2 },
    { id: 'fState', test: (v) => v.trim().length >= 2 },
    { id: 'fZip',   test: (v) => v.trim().length >= 5 }
  ];

  function validate() {
    let ok = true;
    fields.forEach((f) => {
      const el = $(f.id);
      const good = f.test(el.value);
      el.closest('.fld').classList.toggle('invalid', !good);
      if (!good) ok = false;
    });
    return ok;
  }

  fields.forEach((f) => {
    $(f.id).addEventListener('input', () => $(f.id).closest('.fld').classList.remove('invalid'));
  });

  // ---------- Step switching ----------
  function goto(step) {
    document.querySelectorAll('.step').forEach((s) => s.classList.remove('active'));
    $(step).classList.add('active');
    window.scrollTo(0, 0);
  }

  // ---------- Continue to payment ----------
  $('btnContinue').addEventListener('click', () => {
    if (!validate()) return;
    if (!state.orderNumber) state.orderNumber = makeOrderNumber();
    sendPreliminary(); // safety net: order is on record even if they never return
    startPayment();
    goto('step-pay');
  });

  // Fire-and-forget "order started" record so a paid-but-closed-the-tab
  // customer is never lost. Sent once per order; the final submission
  // with etapa "Pago confirmado" is the authoritative row.
  function sendPreliminary() {
    if (state.preliminarySent) return;
    state.preliminarySent = true;
    fetch('./', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: buildPayload('Iniciada').toString()
    }).catch(() => { state.preliminarySent = false; });
  }

  // ---------- Payment step ----------
  function startPayment() {
    state.launchedPay = false;
    state.launchTime = 0;
    state.payStepTime = Date.now();
    $('payOrderNo').textContent = '#' + state.orderNumber;
    $('payName').textContent = $('fName').value.trim();
    $('verifyNum').textContent = state.orderNumber;
    $('fCheck').checked = false;
    updateGate();
    setMethod('zelle');
  }

  function renderPaymentTexts() {
    $('payTotal').textContent = '$' + orderTotal().toFixed(2);
    const ship = MV_CONFIG.SHIPPING_INCLUDED ? t('shipInc') : t('shipPlus', { fee: money(MV_CONFIG.SHIPPING_FLAT) });
    $('payDetail').textContent = state.qty === 1
      ? t('detailOne', { p: money(state.unitPrice), ship: ship })
      : t('detailMany', { n: state.qty, p: money(state.unitPrice), ship: ship });

    const total = '$' + orderTotal().toFixed(2);
    if (state.method === 'zelle') {
      $('payBtn').textContent = t('payZelle');
      $('payHint').innerHTML = t('zelleHint', { name: MV_CONFIG.ZELLE_NAME, total: total });
      $('payFallback').innerHTML = t('fallbackZelle', { num: MV_CONFIG.ZELLE_NUMBER, name: MV_CONFIG.ZELLE_NAME });
    } else {
      const tag = '$' + MV_CONFIG.CASHAPP_TAG.replace(/^\$/, '');
      $('payBtn').textContent = t('payCash');
      $('payHint').innerHTML = t('cashHint', { total: total, tag: tag });
      $('payFallback').innerHTML = t('fallbackCash', { tag: tag });
    }
  }

  function setMethod(m) {
    state.method = m;
    document.querySelectorAll('.pay-tab').forEach((tb) => tb.classList.toggle('on', tb.dataset.method === m));
    const zone = $('qrZone');
    const btn = $('payBtn');
    zone.innerHTML = '';
    btn.className = 'pay-btn ' + (m === 'zelle' ? 'zelle' : 'cashapp');

    if (m === 'zelle') {
      btn.href = MV_CONFIG.ZELLE_PAY_URL;
      if (MV_CONFIG.ZELLE_QR_IMAGE) {
        const img = new Image();
        img.className = 'qr-img';
        img.alt = 'Zelle QR';
        img.onload = () => zone.appendChild(img);
        img.src = MV_CONFIG.ZELLE_QR_IMAGE;
      }
    } else {
      const tag = MV_CONFIG.CASHAPP_TAG.replace(/^\$/, '');
      btn.href = 'https://cash.app/$' + tag + '/' + orderTotal().toFixed(2);
      const holder = document.createElement('div');
      zone.appendChild(holder);
      new QRCode(holder, {
        text: btn.href,
        width: 150, height: 150,
        colorDark: '#4A1230', colorLight: '#ffffff'
      });
    }
    renderPaymentTexts();
  }

  document.querySelectorAll('.pay-tab').forEach((tb) => {
    tb.addEventListener('click', () => setMethod(tb.dataset.method));
  });

  $('btnBack').addEventListener('click', () => goto('step-order'));

  // ---------- Copy helpers ----------
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy') ? resolve() : reject();
      } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  let toastTimer = null;
  function showToast() {
    const el = $('toast');
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  function wireCopy(btnId, lblKey) {
    const btn = $(btnId);
    if (!btn) return;
    const labelEl = btn.querySelector('span');
    btn.addEventListener('click', async () => {
      try {
        await copyText(state.orderNumber);
        btn.classList.add('copied');
        labelEl.textContent = t('copied');
        setTimeout(() => {
          btn.classList.remove('copied');
          labelEl.textContent = t(lblKey);
        }, 1800);
      } catch (e) {
        labelEl.textContent = state.orderNumber;
      }
    });
  }

  wireCopy('btnCopyPay', 'copyPayLbl');
  wireCopy('btnCopyDone', 'copyDoneLbl');

  // Pay button: mark launched, start the timer, auto-copy order number
  $('payBtn').addEventListener('click', () => {
    if (!state.launchedPay) {
      state.launchedPay = true;
      state.launchTime = Date.now();
    }
    copyText(state.orderNumber).then(showToast).catch(() => {});
    updateGate();
  });

  // ---------- Guardrails: checkbox + minimum payment time ----------
  // The submit button unlocks only when the box is checked AND enough real
  // time has passed for a genuine payment (MIN_PAY_SECONDS). The clock starts
  // when they tap the pay button; for "paid another way" it starts when the
  // payment screen opened.
  let gateTimer = null;

  function secondsRemaining() {
    const minMs = (MV_CONFIG.MIN_PAY_SECONDS || 78) * 1000;
    const anchor = state.launchedPay && state.launchTime ? state.launchTime : state.payStepTime;
    if (!anchor) return MV_CONFIG.MIN_PAY_SECONDS || 78;
    return Math.max(0, Math.ceil((anchor + minMs - Date.now()) / 1000));
  }

  function fmtClock(s) {
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }

  function updateGate() {
    const remaining = secondsRemaining();
    const checked = $('fCheck').checked;
    const note = $('waitNote');

    if (checked && remaining > 0) {
      // Checked early: show live countdown, keep button locked
      note.style.display = 'block';
      note.innerHTML = remaining > 3
        ? t('waitNote', { time: '<span class="clock">' + fmtClock(remaining) + '</span>' })
        : t('waitAlmost');
      $('btnPaid').disabled = true;
      if (!gateTimer) gateTimer = setInterval(updateGate, 1000);
      return;
    }

    note.style.display = 'none';
    if (gateTimer && remaining <= 0) { clearInterval(gateTimer); gateTimer = null; }
    $('btnPaid').disabled = !checked;
  }

  $('fCheck').addEventListener('change', updateGate);

  function showModal() {
    const total = '$' + orderTotal().toFixed(2);
    $('modalBody').innerHTML = state.method === 'zelle'
      ? t('modalBodyZelle', { total: total })
      : t('modalBodyCash', { total: total });
    $('modalFine').textContent = t('modalFine');
    $('modalOpen').textContent = state.method === 'zelle' ? t('modalOpenZelle') : t('modalOpenCash');
    $('payModal').classList.add('on');
  }

  function hideModal() { $('payModal').classList.remove('on'); }

  $('modalOpen').addEventListener('click', () => {
    if (!state.launchedPay) {
      state.launchedPay = true;
      state.launchTime = Date.now();
    }
    hideModal();
    window.open($('payBtn').href, '_blank', 'noopener');
    copyText(state.orderNumber).then(showToast).catch(() => {});
    updateGate();
  });

  $('modalAlt').addEventListener('click', () => {
    state.launchedPay = true;
    hideModal();
    // "Paid another way" is timed from when the payment screen opened
    if (secondsRemaining() > 0) { updateGate(); return; }
    doSubmit();
  });

  // ---------- Submit ----------
  $('btnPaid').addEventListener('click', () => {
    if (!$('fCheck').checked) return;
    if (!state.launchedPay) { showModal(); return; }
    if (secondsRemaining() > 0) { updateGate(); return; }
    doSubmit();
  });

  function buildPayload(stage) {
    const confirmed = stage !== 'Iniciada';
    return new URLSearchParams({
      'form-name': 'ordenes',
      'orden': state.orderNumber,
      'nombre': $('fName').value.trim(),
      'telefono': $('fPhone').value.trim(),
      'correo': $('fEmail').value.trim().toLowerCase(),
      'direccion': $('fAddr1').value.trim(),
      'ciudad': $('fCity').value.trim(),
      'estado': $('fState').value.trim().toUpperCase(),
      'codigo_postal': $('fZip').value.trim(),
      'cantidad': String(state.qty),
      'precio_unitario': String(state.unitPrice),
      'total': orderTotal().toFixed(2),
      'metodo_pago': confirmed ? (state.method === 'zelle' ? 'Zelle' : 'Cash App') : 'Pendiente',
      'referencia_pago': confirmed ? 'Cliente confirmo memo con numero de orden' : 'Orden iniciada - pago aun no confirmado',
      'etapa': stage,
      'idioma': state.lang === 'es' ? 'Espanol' : 'English',
      'fecha': new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      'bot-field': ''
    });
  }

  async function doSubmit() {
    $('ePay').classList.remove('show');
    $('btnPaid').disabled = true;

    busy(true);
    try {
      const res = await fetch('./', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: buildPayload('Pago confirmado').toString()
      });
      if (!res.ok) throw new Error('submit failed');
      $('doneOrderNo').textContent = '#' + state.orderNumber;
      goto('step-done');
    } catch (e) {
      $('ePay').textContent = t('submitErr');
      $('ePay').classList.add('show');
      $('btnPaid').disabled = false;
    } finally {
      busy(false);
    }
  }

  // ---------- Init ----------
  applyLang();
})();
