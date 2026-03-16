import {defineField, defineType} from 'sanity'

export const linktreeSettingsType = defineType({
  name: 'linktreeSettings',
  title: 'Linktree Settings',
  type: 'document',
  groups: [
    { name: 'content', title: '1. Konten Utama', default: true },
    { name: 'appearance', title: '2. Tampilan & Desain' },
    { name: 'seo', title: '3. SEO & Metadata' },
  ],
  fields: [
    // --- SEO ---
    defineField({
      name: 'seoTitle',
      title: 'Meta Title (SEO)',
      description: 'Judul yang muncul di tab browser (misal: Links | Radeva Organizer)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description (SEO)',
      description: 'Deskripsi singkat web untuk pencarian Google.',
      type: 'text',
      group: 'seo',
    }),

    // --- KONTEN UTAMA ---
    defineField({
      name: 'headerBanner',
      title: 'Header Banner / Cover',
      description: 'Gambar spanduk opsional di bagian paling atas kotak (seperti header Twitter/X).',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'profileName',
      title: 'Profile Name',
      type: 'string',
      initialValue: 'Radeva Wedding Organizer',
      group: 'content',
    }),
    defineField({
      name: 'verifiedBadge',
      title: 'Tampilkan Centang Biru (Verified Badge)',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'location',
      title: 'Location Text',
      type: 'string',
      initialValue: 'Semarang & Jawa Tengah',
      group: 'content',
    }),
    defineField({
      name: 'hideLocation',
      title: 'Sembunyikan Lokasi?',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero / Greeting Text',
      type: 'text',
      initialValue: 'Hai #RekanRadeva! Let us be the part of your BIG DAY!',
      group: 'content',
    }),

    // --- TOMBOL & SOSMED ---
    defineField({
      name: 'socialLinks',
      title: 'Mini Social Icons',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: ['email', 'instagram', 'tiktok', 'spotify', 'whatsapp', 'youtube', 'facebook', 'twitter'] }
            }),
            defineField({name: 'url', title: 'URL Tujuan', type: 'string'}),
          ],
        }
      ]
    }),
    defineField({
      name: 'socialPosition',
      title: 'Posisi Icon Sosmed',
      type: 'string',
      options: {
        list: [
          {title: 'Di Atas (Bawah Nama Profil)', value: 'top'},
          {title: 'Di Bawah (Di Atas Footer)', value: 'bottom'},
        ]
      },
      initialValue: 'top',
      group: 'appearance',
    }),
    defineField({
      name: 'links',
      title: 'Links List (Tombol Utama)',
      description: 'Tambah, urutkan (drag), atau edit link memanjang.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title / Teks', type: 'string'}),
            defineField({name: 'url', title: 'URL Target', type: 'url', validation: (Rule) => Rule.uri({allowRelative: true}), hidden: ({parent}) => parent?.type === 'divider' || parent?.type === 'newsletter' || parent?.type === 'countdown' || parent?.type === 'bank'}),
            defineField({
              name: 'type',
              title: 'Format Link',
              type: 'string',
              options: { list: [
                {title: 'Normal Button Link', value: 'link'},
                {title: 'Portfolio Grid Image', value: 'portfolio'},
                {title: 'Section Divider (Teks Pemisah)', value: 'divider'},
                {title: 'Newsletter Subscribe Box', value: 'newsletter'},
                {title: 'Countdown Timer Widget', value: 'countdown'},
                {title: 'Rekening / Kado Digital Widget', value: 'bank'},
              ], layout: 'radio' },
              initialValue: 'link',
            }),
            
            // Countdown Fields
            defineField({name: 'countdownDate', title: 'Target Tanggal & Waktu (Untuk Countdown)', type: 'datetime', hidden: ({parent}) => parent?.type !== 'countdown'}),
            
            // Bank / Digital Gift Fields
            defineField({name: 'bankName', title: 'Nama Bank / E-Wallet (BCA/Mandiri/Gopay)', type: 'string', hidden: ({parent}) => parent?.type !== 'bank'}),
            defineField({name: 'bankAccountNumber', title: 'Nomor Rekening / HP', type: 'string', hidden: ({parent}) => parent?.type !== 'bank'}),
            defineField({name: 'bankAccountName', title: 'Atas Nama', type: 'string', hidden: ({parent}) => parent?.type !== 'bank'}),

            // Link Fields
            defineField({name: 'icon', title: 'Icon (Opsional)', type: 'image', hidden: ({parent}) => parent?.type === 'divider' || parent?.type === 'newsletter' || parent?.type === 'countdown' || parent?.type === 'bank'}),
            defineField({name: 'badgeText', title: 'Teks Badge (Contoh: PROMO, NEW)', type: 'string', hidden: ({parent}) => parent?.type !== 'link'}),
            defineField({name: 'badgeColor', title: 'Warna Badge', type: 'string', options: {list: ['merah', 'hijau', 'biru', 'kuning']}, initialValue: 'merah', hidden: ({parent}) => !parent?.badgeText}),
            defineField({name: 'isHighlighted', title: 'Highlight Animasi Kelap-Kelip?', type: 'boolean', initialValue: false, hidden: ({parent}) => parent?.type !== 'link'}),
            defineField({name: 'isActive', title: 'Aktif?', type: 'boolean', initialValue: true}),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      initialValue: 'Radeva Organizer',
      group: 'content',
    }),

    // --- TAMPILAN & DESAIN ---
    defineField({
      name: 'themeColor',
      title: 'Tema Warna Global (Background)',
      description: 'Pilih warna latar belakang utama halaman Linktree Anda.',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'appearance',
    }),
    defineField({
      name: 'fontColor',
      title: 'Warna Font (Teks)',
      description: 'Pilih warna teks/tulisan. Jika dikosongkan, sistem akan menyesuaikan otomatis.',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'appearance',
    }),
    defineField({
      name: 'verifiedBadgeColor',
      title: 'Warna Ikon Verified (Centang)',
      description: 'Pilih warna ikon centang verified di samping nama profil.',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'appearance',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Custom Background Image',
      description: 'Akan menimpa warna tema jika diisi.',
      type: 'image',
      options: { hotspot: true },
      group: 'appearance',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Custom Background Video (MP4)',
      description: 'Video berputar otomatis di latar belakang. Menggantikan Image Background.',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'appearance',
    }),
    defineField({
      name: 'backgroundMusic',
      title: 'Backsound / Musik Latar (MP3)',
      description: 'Lagu otomatis diputar (dengan tombol interaktif) untuk kesan romantis/aesthetic.',
      type: 'file',
      options: { accept: 'audio/mpeg,audio/wav' },
      group: 'appearance',
    }),
    defineField({
      name: 'particleEffect',
      title: 'Efek Salju / Kelopak Bunga (Partikel Ajaib)',
      description: 'Tambahkan efek magis yang berjatuhan/melayang di layar.',
      type: 'string',
      options: { list: [
        {title: 'Tidak Ada', value: 'none'},
        {title: 'Kelopak Sakura', value: 'sakura'},
        {title: 'Salju Romantis', value: 'snow'},
        {title: 'Cahaya Keemasan (Golden Glow)', value: 'glow'}
      ] },
      initialValue: 'none',
      group: 'appearance',
    }),
    defineField({
      name: 'fontFamily',
      title: 'Gaya Font (Tipografi)',
      type: 'string',
      options: {
        list: [
          {title: 'Modern (Sans-serif)', value: 'sans'},
          {title: 'Klasik/Elegan (Serif)', value: 'serif'},
          {title: 'Mesin Tik (Mono)', value: 'mono'},
        ]
      },
      initialValue: 'sans',
      group: 'appearance',
    }),
    defineField({
      name: 'buttonHoverAnimation',
      title: 'Animasi Hover Tombol',
      type: 'string',
      options: {
        list: [
          {title: 'Membesar (Scale-up)', value: 'scale'},
          {title: 'Melompat (Bounce)', value: 'bounce'},
          {title: 'Bersinar (Pulse Glow)', value: 'pulse'},
        ]
      },
      initialValue: 'scale',
      group: 'appearance',
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Gaya Tombol Utama',
      type: 'string',
      options: {
        list: [
          {title: 'Kaca Transparan (Glassmorphism)', value: 'glass'},
          {title: 'Warna Solid (Penuh)', value: 'solid'},
          {title: 'Garis Luar (Outline)', value: 'outline'},
        ]
      },
      initialValue: 'glass',
      group: 'appearance',
    }),
    defineField({
      name: 'buttonShape',
      title: 'Bentuk Tombol',
      type: 'string',
      options: {
        list: [
          {title: 'Pil (Bulat Penuh)', value: 'rounded-full'},
          {title: 'Tumpul (Rounded)', value: 'rounded-xl'},
          {title: 'Kotak (Square)', value: 'rounded-none'},
        ]
      },
      initialValue: 'rounded-full',
      group: 'appearance',
    }),
    defineField({
      name: 'profileShape',
      title: 'Bentuk Foto Profil',
      type: 'string',
      options: {
        list: [
          {title: 'Lingkaran', value: 'rounded-full'},
          {title: 'Tumpul', value: 'rounded-2xl'},
          {title: 'Kotak', value: 'rounded-none'},
        ]
      },
      initialValue: 'rounded-full',
      group: 'appearance',
    }),
  ],
})
