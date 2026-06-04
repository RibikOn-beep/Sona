export const LIBRARY = {
  ploaie: {
    label: 'Ploaie',
    icon: '🌧',
    sounds: [
      { id: 'ploaie_fereastra', name: 'Ploaie pe fereastră', file: require('../../assets/audio/library/ploaie/ploaie_pe_fereastra.ogg'), somn: 3, calm: 2, energie: 0, focus: 2 },
      { id: 'ploaie_acoperis_lemn', name: 'Ploaie pe acoperiș de lemn', file: require('../../assets/audio/library/ploaie/ploaie_acoperis_lemn.ogg'), somn: 3, calm: 2, energie: 0, focus: 0 },
      { id: 'ploaie_acoperis_metalic', name: 'Ploaie pe acoperiș metalic', file: require('../../assets/audio/library/ploaie/ploaie_acoperis_metalic.ogg'), somn: 3, calm: 1, energie: 0, focus: 2 },
      { id: 'ploaie_padure_somn', name: 'Ploaie în pădure', file: require('../../assets/audio/library/ploaie/ploaie_padure_somn.ogg'), somn: 2, calm: 3, energie: 0, focus: 0 },
      { id: 'ploaie_padure_relax', name: 'Ploaie în pădure cu păsărele', file: require('../../assets/audio/library/ploaie/ploaie_padure_relax.ogg'), somn: 1, calm: 3, energie: 1, focus: 0 },
      { id: 'ploaie_cort', name: 'Ploaie în cort', file: require('../../assets/audio/library/ploaie/ploaie_in_cort.ogg'), somn: 3, calm: 2, energie: 0, focus: 0 },
      { id: 'ploaie_urbana', name: 'Ploaie urbană nocturnă', file: require('../../assets/audio/library/ploaie/ploaie_urbana_nocturna.ogg'), somn: 3, calm: 1, energie: 0, focus: 2 },
      { id: 'ploaie_vara', name: 'Ploaie de vară', file: require('../../assets/audio/library/ploaie/ploaie_de_vara.ogg'), somn: 1, calm: 3, energie: 1, focus: 0 },
      { id: 'ploaie_vant', name: 'Ploaie și vânt', file: require('../../assets/audio/library/ploaie/ploaie_si_vant.ogg'), somn: 1, calm: 1, energie: 0, focus: 0 },
    ],
  },
  apa: {
    label: 'Apă',
    icon: '💧',
    sounds: [
      { id: 'ocean_linistit', name: 'Ocean liniștit', file: require('../../assets/audio/library/apa/ocean_linistit.ogg'), somn: 2, calm: 3, energie: 2, focus: 0 },
      { id: 'ocean_nocturn', name: 'Ocean nocturn', file: require('../../assets/audio/library/apa/ocean_nocturn.ogg'), somn: 3, calm: 2, energie: 0, focus: 0 },
      { id: 'valuri_plaja', name: 'Valuri lente pe plajă', file: require('../../assets/audio/library/apa/valuri_lente_plaja.ogg'), somn: 3, calm: 3, energie: 1, focus: 0 },
      { id: 'parau_montan', name: 'Pârâu montan', file: require('../../assets/audio/library/apa/parau_montan.ogg'), somn: 1, calm: 3, energie: 3, focus: 0 },
      { id: 'rau_linistit', name: 'Râu liniștit', file: require('../../assets/audio/library/apa/rau_linistit.ogg'), somn: 2, calm: 3, energie: 0, focus: 0 },
      { id: 'lac_linistit', name: 'Lac liniștit', file: require('../../assets/audio/library/apa/lac_linistit.ogg'), somn: 3, calm: 3, energie: 0, focus: 0 },
      { id: 'cascada_blanda', name: 'Cascadă blândă', file: require('../../assets/audio/library/apa/cascada_blanda.ogg'), somn: 1, calm: 2, energie: 2, focus: 1 },
      { id: 'fantana_zen', name: 'Fântână zen', file: require('../../assets/audio/library/apa/fantana_zen.ogg'), somn: 2, calm: 3, energie: 0, focus: 1 },
    ],
  },
  natura: {
    label: 'Natură',
    icon: '🌿',
    sounds: [
      { id: 'padure_rasarit', name: 'Pădure la răsărit', file: require('../../assets/audio/library/natura/padure_la_rasarit.ogg'), somn: 0, calm: 2, energie: 3, focus: 0 },
      { id: 'padure_nocturna', name: 'Pădure nocturnă', file: require('../../assets/audio/library/natura/padure_nocturna.ogg'), somn: 3, calm: 2, energie: 0, focus: 0 },
      { id: 'pasari_dimineata', name: 'Păsări de dimineață', file: require('../../assets/audio/library/natura/pasari_de_dimineata.ogg'), somn: 0, calm: 1, energie: 3, focus: 0 },
      { id: 'greieri_seara', name: 'Greieri de seară', file: require('../../assets/audio/library/natura/greieri_de_seara.ogg'), somn: 3, calm: 2, energie: 0, focus: 0 },
      { id: 'vant_frunze', name: 'Vânt prin frunze', file: require('../../assets/audio/library/natura/vant_prin_frunze.ogg'), somn: 1, calm: 3, energie: 1, focus: 0 },
      { id: 'vant_iarba', name: 'Vânt prin iarbă', file: require('../../assets/audio/library/natura/vant_prin_iarba.ogg'), somn: 0, calm: 2, energie: 2, focus: 0 },
      { id: 'poiana_montana', name: 'Poiană montană', file: require('../../assets/audio/library/natura/poiana_montana.ogg'), somn: 0, calm: 2, energie: 3, focus: 0 },
      { id: 'gradina_japoneza', name: 'Grădină japoneză', file: require('../../assets/audio/library/natura/gradina_japoneza.ogg'), somn: 1, calm: 3, energie: 0, focus: 1 },
    ],
  },
  adapost: {
    label: 'Adăpost',
    icon: '🏠',
    sounds: [
      { id: 'semineu', name: 'Șemineu', file: require('../../assets/audio/library/adapost/semineu.ogg'), somn: 3, calm: 3, energie: 0, focus: 0 },
      { id: 'soba_lemne', name: 'Sobă cu lemne', file: require('../../assets/audio/library/adapost/soba_cu_lemne.ogg'), somn: 3, calm: 3, energie: 0, focus: 0 },
      { id: 'cabana_furtuna', name: 'Cabană în furtună', file: require('../../assets/audio/library/adapost/cabana_in_furtuna.ogg'), somn: 2, calm: 2, energie: 0, focus: 0 },
      { id: 'mansarda_ploaie', name: 'Mansardă în ploaie', file: require('../../assets/audio/library/adapost/mansarda_in_ploaie.ogg'), somn: 3, calm: 2, energie: 0, focus: 0 },
      { id: 'interior_furtuna', name: 'Interior călduros în furtună', file: require('../../assets/audio/library/adapost/interior_calduros_furtuna.ogg'), somn: 3, calm: 3, energie: 0, focus: 0 },
      { id: 'refugiu_montan', name: 'Refugiu montan', file: require('../../assets/audio/library/adapost/refugiu_montan.ogg'), somn: 3, calm: 3, energie: 0, focus: 0 },
    ],
  },
  calatorie: {
    label: 'Călătorie',
    icon: '🚂',
    sounds: [
      { id: 'tren_noapte', name: 'Tren de noapte', file: require('../../assets/audio/library/calatorie/tren_de_noapte.ogg'), somn: 3, calm: 1, energie: 0, focus: 0 },
      { id: 'tren_ploaie', name: 'Tren prin ploaie', file: require('../../assets/audio/library/calatorie/tren_prin_ploaie.ogg'), somn: 3, calm: 1, energie: 0, focus: 0 },
      { id: 'compartiment_dormit', name: 'Compartiment de dormit', file: require('../../assets/audio/library/calatorie/compartiment_dormit.ogg'), somn: 3, calm: 1, energie: 0, focus: 0 },
      { id: 'tren_sine', name: 'Tren pe șine clasice', file: require('../../assets/audio/library/calatorie/tren_pe_sine_clasice.ogg'), somn: 2, calm: 0, energie: 0, focus: 1 },
      { id: 'vapor_linistit', name: 'Vapor liniștit', file: require('../../assets/audio/library/calatorie/vapor_linistit.ogg'), somn: 2, calm: 2, energie: 0, focus: 0 },
      { id: 'feribot_nocturn', name: 'Feribot nocturn', file: require('../../assets/audio/library/calatorie/feribot_nocturn.ogg'), somn: 3, calm: 1, energie: 0, focus: 0 },
    ],
  },
  ambiante: {
    label: 'Ambiante',
    icon: '🏙',
    sounds: [
      { id: 'biblioteca_linistita', name: 'Bibliotecă liniștită', file: require('../../assets/audio/library/ambiante/biblioteca_linistita.ogg'), somn: 2, calm: 3, energie: 0, focus: 3 },
      { id: 'biblioteca_veche', name: 'Bibliotecă veche', file: require('../../assets/audio/library/ambiante/biblioteca_veche.ogg'), somn: 2, calm: 3, energie: 0, focus: 3 },
      { id: 'cafenea_linistita', name: 'Cafenea liniștită', file: require('../../assets/audio/library/ambiante/cafenea_linistita.ogg'), somn: 0, calm: 3, energie: 0, focus: 2 },
      { id: 'cafenea_ploaie', name: 'Cafenea în ploaie', file: require('../../assets/audio/library/ambiante/cafenea_in_ploaie.ogg'), somn: 0, calm: 3, energie: 0, focus: 2 },
      { id: 'spa_relaxant', name: 'Spa relaxant', file: require('../../assets/audio/library/ambiante/spa_relaxant.ogg'), somn: 0, calm: 3, energie: 0, focus: 0 },
      { id: 'chalet_alpin', name: 'Chalet alpin', file: require('../../assets/audio/library/ambiante/chalet_alpin.ogg'), somn: 2, calm: 3, energie: 0, focus: 0 },
    ],
  },
  noise: {
    label: 'Noise',
    icon: '〰',
    sounds: [
      { id: 'brown_noise', name: 'Brown Noise', file: require('../../assets/audio/library/noise/brown_noise.ogg'), somn: 3, calm: 2, energie: 0, focus: 3 },
      { id: 'pink_noise', name: 'Pink Noise', file: require('../../assets/audio/library/noise/pink_noise.ogg'), somn: 3, calm: 2, energie: 0, focus: 3 },
      { id: 'white_noise', name: 'White Noise', file: require('../../assets/audio/library/noise/white_noise.ogg'), somn: 2, calm: 1, energie: 0, focus: 2 },
    ],
  },
  muzica: {
    label: 'Muzică',
    icon: '🎵',
    sounds: [
      { id: 'pian_ambiental', name: 'Pian ambiental', file: require('../../assets/audio/library/muzica/pian_ambiental.ogg'), somn: 2, calm: 3, energie: 0, focus: 1 },
      { id: 'pian_somn', name: 'Pian pentru somn', file: require('../../assets/audio/library/muzica/pian_pentru_somn.ogg'), somn: 3, calm: 2, energie: 0, focus: 0 },
      { id: 'harpa_ambientala', name: 'Harpa ambientală', file: require('../../assets/audio/library/muzica/harpa_ambientala.ogg'), somn: 2, calm: 3, energie: 0, focus: 0 },
      { id: 'pad_ambiental', name: 'Pad ambiental', file: require('../../assets/audio/library/muzica/pad_ambiental.ogg'), somn: 3, calm: 2, energie: 0, focus: 1 },
      { id: 'violoncel_ambiental', name: 'Violoncel ambiental', file: require('../../assets/audio/library/muzica/violoncel_ambiental.ogg'), somn: 2, calm: 3, energie: 0, focus: 1 },
      { id: 'atmosfera_cinematica', name: 'Atmosferă cinematică', file: require('../../assets/audio/library/muzica/atmosfera_cinematica.ogg'), somn: 1, calm: 2, energie: 2, focus: 2 },
    ],
  },
};

export const getRecommendedSounds = (stare, limit = 4) => {
  const key = stare;
  const all = Object.values(LIBRARY).flatMap(cat => cat.sounds);
  return all
    .filter(s => s[key] >= 2)
    .sort((a, b) => b[key] - a[key])
    .slice(0, limit);
};
