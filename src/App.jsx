import React, { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════
// CONSTANTS & DATA
// ═══════════════════════════════════════════════
const C = {
  green:"#1B6B2F",greenMid:"#2E9B3F",greenLight:"#4CAF50",greenPale:"#E8F5E9",
  greenGrad:"linear-gradient(135deg,#1B6B2F,#2E9B3F)",
  blue:"#1565A8",blueMid:"#1B7EC2",bluePale:"#E3F2FD",
  blueGrad:"linear-gradient(135deg,#1565A8,#1B7EC2)",
  gold:"#F5C842",goldDark:"#D4A017",goldPale:"#FFF8E1",
  goldGrad:"linear-gradient(135deg,#F5C842,#D4A017)",
  dark:"#0D2137",mid:"#546E7A",gray:"#F5F7FA",grayMid:"#90A4AE",
  grayLight:"#ECEFF1",white:"#FFFFFF",danger:"#E53935",warn:"#FF9800",teal:"#00897B",
};
const fmt=n=>new Intl.NumberFormat("id-ID").format(n);
const fmtTP=n=>`${fmt(n)} TP`;

const PRODS=[
  {id:1,name:"Gabah Organik Premium",seller:"Pak Slamet",sId:"s1",price:8000,tp:16,unit:"kg",stock:500,cat:"pertanian",em:"🌾",rating:4.8,sold:234,loc:"Klaten, Jawa Tengah",desc:"Gabah organik bebas pestisida, dibudidayakan dengan metode alami. Sudah tersertifikasi organik dari Dinas Pertanian Jawa Tengah. Hasil panen musim ini sangat baik.",reviews:[{u:"Bu Rina",s:5,c:"Berasnya pulen banget, sudah jadi langganan!"},{u:"Pak Dono",s:5,c:"Kualitas terjamin, pengiriman cepat."},{u:"Ibu Sari",s:4,c:"Bagus, harga juga wajar untuk organik."}]},
  {id:2,name:"Cabai Merah Keriting",seller:"Bu Rosmini",sId:"s2",price:35000,tp:70,unit:"kg",stock:200,cat:"pertanian",em:"🌶️",rating:4.7,sold:189,loc:"Garut, Jawa Barat",desc:"Cabai merah keriting segar dipetik pagi hari langsung dari kebun. Tingkat kepedasan tinggi, cocok untuk masakan Padang dan sambal.",reviews:[{u:"Warung Padang",s:5,c:"Segar dan pedas, pelanggan suka!"},{u:"Ibu Dapur",s:4,c:"Kualitas konsisten, stok selalu ada."}]},
  {id:3,name:"Kopi Arabica Gayo",seller:"Koperasi Gayo",sId:"s3",price:120000,tp:240,unit:"kg",stock:300,cat:"perkebunan",em:"☕",rating:5.0,sold:567,loc:"Aceh Tengah, Aceh",desc:"Kopi arabica single origin dari dataran tinggi Gayo 1200 mdpl. Proses natural, rasa fruity dengan aroma floral. Sudah diekspor ke Jepang, Eropa dan Amerika.",reviews:[{u:"Roaster Jakarta",s:5,c:"Konsisten, terbaik dari Gayo!"},{u:"Cafe Bali",s:5,c:"Pelanggan kami sangat suka kualitasnya."}]},
  {id:4,name:"Udang Vaname Segar",seller:"Tambak Pak Budi",sId:"s4",price:85000,tp:170,unit:"kg",stock:500,cat:"nelayan",em:"🦐",rating:4.8,sold:678,loc:"Lampung Selatan",desc:"Udang vaname size 50, budidaya tambak intensif dengan pakan berkualitas. Segar, bersih, bebas antibiotik. Siap kirim dengan cold chain.",reviews:[{u:"Restoran Seafood",s:5,c:"Segar dan bersih, cocok untuk restoran premium."},{u:"Hotel Bintang 5",s:5,c:"Kualitas terjaga, pengiriman andal."}]},
  {id:5,name:"Ikan Tuna Sirip Kuning",seller:"Nelayan Bitung",sId:"s5",price:65000,tp:130,unit:"kg",stock:100,cat:"nelayan",em:"🐟",rating:4.9,sold:345,loc:"Bitung, Sulawesi Utara",desc:"Tuna sirip kuning segar, tangkapan pagi hari dari Laut Maluku. Daging merah segar, cocok untuk sashimi grade dan steak tuna premium.",reviews:[{u:"Sushi Bar Jakarta",s:5,c:"Kualitas sashimi grade, luar biasa!"},{u:"Hotel Resort",s:5,c:"Selalu fresh dan berkualitas tinggi."}]},
  {id:6,name:"Kakao Fermentasi",seller:"Bu Cici Farm",sId:"s6",price:45000,tp:90,unit:"kg",stock:800,cat:"perkebunan",em:"🍫",rating:4.9,sold:234,loc:"Kolaka, Sulawesi Tenggara",desc:"Biji kakao fermentasi 5 hari penuh dengan metode kotak kayu. Flavor profile fruity dan nutty. Diminati chocolate maker lokal dan internasional.",reviews:[{u:"Chocolatier",s:5,c:"Best Sulawesi cocoa I ever tasted!"},{u:"Eksportir Kakao",s:5,c:"Kualitas konsisten, siap ekspor."}]},
  {id:7,name:"Traktor Mini 7HP",seller:"AgriMaju Store",sId:"s7",price:8500000,tp:17000,unit:"unit",stock:10,cat:"peralatan",em:"🚜",rating:4.8,sold:45,loc:"Malang, Jawa Timur",desc:"Traktor mini mesin diesel 7HP, cocok untuk sawah 0.5-2 hektar. Dilengkapi rotavator, mudah dioperasikan oleh satu orang. Garansi mesin 1 tahun.",reviews:[{u:"Petani Klaten",s:5,c:"Sangat membantu, hemat tenaga dan waktu!"},{u:"Kelompok Tani",s:4,c:"Performa bagus untuk sawah kecil hingga sedang."}]},
  {id:8,name:"Rod Pancing Carbon 2.4m",seller:"Fishing Pro",sId:"s8",price:280000,tp:560,unit:"unit",stock:25,cat:"pancing",em:"🎣",rating:4.8,sold:89,loc:"Jakarta",desc:"Rod karbon T700, ringan dan kuat, panjang 2.4m. Cocok untuk mancing laut, sungai, dan danau. Ring SiC anti gesekan, bawa angler ke level berikutnya.",reviews:[{u:"Angler Pro",s:5,c:"Ringan, sensitif, sangat direkomendasikan!"},{u:"Pemancing Danau",s:5,c:"Kualitas bagus dengan harga terjangkau."}]},
  {id:9,name:"Sawit TBS Segar",seller:"Pak Ridwan",sId:"s9",price:1800,tp:3.6,unit:"kg",stock:50000,cat:"perkebunan",em:"🌴",rating:4.5,sold:1200,loc:"Riau",desc:"Tandan Buah Segar kelapa sawit berkualitas tinggi. Kadar minyak optimal, siap olah ke PKS. Tersedia dalam jumlah besar untuk kebutuhan pabrik.",reviews:[{u:"PKS Riau",s:5,c:"Kualitas TBS konsisten, pasokan lancar."}]},
  {id:10,name:"Kepiting Bakau Jumbo",seller:"Budidaya Pak Leman",sId:"s10",price:150000,tp:300,unit:"kg",stock:50,cat:"nelayan",em:"🦀",rating:5.0,sold:89,loc:"Kalimantan Selatan",desc:"Kepiting bakau jumbo 500g+, budidaya manggrove alami, berisi penuh. Populer di restoran seafood premium dan hotel bintang 5.",reviews:[{u:"Chef Hotel Mulia",s:5,c:"Kepiting terbaik, daging penuh dan manis!"},{u:"Restoran Seafood",s:5,c:"Pelanggan sangat puas, jadi menu andalan."}]},
];

const SELLERS={
  s1:{name:"Pak Slamet",loc:"Klaten, Jawa Tengah",rating:4.8,sold:1234,joined:"Jan 2024",cat:"Pertanian",prods:12,em:"👨‍🌾"},
  s2:{name:"Bu Rosmini",loc:"Garut, Jawa Barat",rating:4.7,sold:890,joined:"Mar 2024",cat:"Pertanian",prods:8,em:"👩‍🌾"},
  s3:{name:"Koperasi Gayo",loc:"Aceh Tengah",rating:5.0,sold:3400,joined:"Jun 2023",cat:"Perkebunan",prods:15,em:"☕"},
  s4:{name:"Tambak Pak Budi",loc:"Lampung Selatan",rating:4.8,sold:2100,joined:"Feb 2024",cat:"Nelayan",prods:6,em:"🦐"},
  s5:{name:"Nelayan Bitung",loc:"Bitung, Sulawesi Utara",rating:4.9,sold:1800,joined:"Apr 2023",cat:"Nelayan",prods:10,em:"🐟"},
  s6:{name:"Bu Cici Farm",loc:"Kolaka, Sulawesi Tenggara",rating:4.9,sold:1100,joined:"Jul 2023",cat:"Perkebunan",prods:7,em:"🍫"},
  s7:{name:"AgriMaju Store",loc:"Malang, Jawa Timur",rating:4.8,sold:456,joined:"Jan 2024",cat:"Peralatan",prods:30,em:"🚜"},
  s8:{name:"Fishing Pro",loc:"Jakarta",rating:4.8,sold:789,joined:"Mar 2023",cat:"Pancing",prods:50,em:"🎣"},
  s9:{name:"Pak Ridwan",loc:"Riau",rating:4.5,sold:5000,joined:"Nov 2022",cat:"Perkebunan",prods:4,em:"🌴"},
  s10:{name:"Pak Leman",loc:"Banjarmasin, Kalsel",rating:5.0,sold:567,joined:"Sep 2023",cat:"Nelayan",prods:5,em:"🦀"},
};

const CATS=[
  {k:"semua",l:"Semua",em:"🌐"},
  {k:"pertanian",l:"Pertanian",em:"🌾"},
  {k:"perkebunan",l:"Perkebunan",em:"🌿"},
  {k:"nelayan",l:"Nelayan",em:"🌊"},
  {k:"peralatan",l:"Peralatan",em:"🚜"},
  {k:"pancing",l:"Pancing",em:"🎣"},
];

const LIVES=[
  {id:1,seller:"Pak Slamet Live",sId:"s1",product:"Flash Sale Gabah Organik!",viewers:234,em:"🌾",price:7500,origPrice:8000},
  {id:2,seller:"Nelayan Bitung Live",sId:"s5",product:"Lelang Tuna Segar Pagi",viewers:1203,em:"🐟",price:60000,origPrice:65000},
  {id:3,seller:"Kopi Gayo Official",sId:"s3",product:"Kopi Premium Diskon 30%",viewers:567,em:"☕",price:84000,origPrice:120000},
  {id:4,seller:"Fishing Pro Live",sId:"s8",product:"Demo Alat Pancing Baru",viewers:189,em:"🎣",price:250000,origPrice:280000},
];

const NOTIFS_D=[
  {id:1,em:"🚚",title:"Pesanan #TAL240619001 dikirim",desc:"Gabah Organik 50kg dalam perjalanan ke alamatmu",time:"10 mnt lalu",color:C.blue,read:false},
  {id:2,em:"💰",title:"TALPAY masuk 1.600 TP",desc:"Dari penjualan Gabah Organik ke Bu Rina",time:"2 jam lalu",color:C.gold,read:false},
  {id:3,em:"🔴",title:"Nelayan Bitung sedang LIVE!",desc:"Ikan Tuna Segar lelang mulai 50rb/kg",time:"3 jam lalu",color:C.danger,read:false},
  {id:4,em:"⭐",title:"Ulasan baru 5 bintang",desc:"Pak Warung memberi bintang 5 untuk Cabai Keriting",time:"5 jam lalu",color:C.warn,read:true},
  {id:5,em:"📦",title:"Produk disetujui",desc:"Gabah Organik sudah live di marketplace TALARA",time:"1 hari lalu",color:C.green,read:true},
  {id:6,em:"🎉",title:"Kamu jadi Top Seller!",desc:"Peringkat #3 penjual terbaik minggu ini",time:"2 hari lalu",color:C.teal,read:true},
];

const ORDERS_D=[
  {id:"TAL240619001",product:"Gabah Organik 50kg",seller:"Pak Slamet",em:"🌾",total:400000,tp:800,status:"dikirim",date:"19 Jun 2026",ekspedisi:"JNE Regular",resi:"JNE1234567890",steps:[
    {s:"Pesanan Dibuat",t:"19 Jun 08:00",done:true},
    {s:"Dikonfirmasi Penjual",t:"19 Jun 08:30",done:true},
    {s:"Sedang Dikemas",t:"19 Jun 09:00",done:true},
    {s:"Diserahkan Kurir",t:"19 Jun 10:00",done:true},
    {s:"Dalam Perjalanan",t:"19 Jun 11:00",done:true},
    {s:"Sampai Tujuan",t:"Est. 20 Jun 2026",done:false},
  ]},
  {id:"TAL240618002",product:"Kopi Arabica Gayo 5kg",seller:"Koperasi Gayo",em:"☕",total:600000,tp:1200,status:"selesai",date:"18 Jun 2026",ekspedisi:"J&T Express",resi:"JT098765432",steps:[
    {s:"Pesanan Dibuat",t:"18 Jun 09:00",done:true},
    {s:"Dikonfirmasi",t:"18 Jun 09:15",done:true},
    {s:"Dikemas",t:"18 Jun 10:00",done:true},
    {s:"Dikirim",t:"18 Jun 12:00",done:true},
    {s:"Diterima",t:"18 Jun 18:00",done:true},
  ]},
  {id:"TAL240617003",product:"Udang Vaname 10kg",seller:"Tambak Pak Budi",em:"🦐",total:850000,tp:1700,status:"selesai",date:"17 Jun 2026",ekspedisi:"SiCepat",resi:"SC112233445",steps:[
    {s:"Pesanan Dibuat",t:"17 Jun 10:00",done:true},
    {s:"Dikirim",t:"17 Jun 13:00",done:true},
    {s:"Diterima",t:"17 Jun 17:00",done:true},
  ]},
];

const CHATS_D=[
  {id:"c1",sId:"s1",sName:"Pak Slamet",em:"👨‍🌾",lastMsg:"Stok masih ada, bisa order sekarang",time:"10:30",unread:2,msgs:[
    {from:"them",text:"Selamat pagi! Gabah organik masih ada stok?",time:"10:15"},
    {from:"me",text:"Masih ada pak, berapa kg yang dibutuhkan?",time:"10:20"},
    {from:"them",text:"100kg bisa? Untuk restoran kami",time:"10:25"},
    {from:"me",text:"Stok masih ada, bisa order sekarang",time:"10:30"},
  ]},
  {id:"c2",sId:"s3",sName:"Koperasi Gayo",em:"☕",lastMsg:"Siap, kami kirim besok pagi pakai J&T",time:"09:45",unread:1,msgs:[
    {from:"them",text:"Halo, kopi arabica tersedia untuk 50kg?",time:"09:30"},
    {from:"me",text:"Tersedia! Mau proses apa? Natural atau washed?",time:"09:33"},
    {from:"them",text:"Natural saja, untuk cafe di Bali",time:"09:38"},
    {from:"me",text:"Siap, kami kirim besok pagi pakai J&T",time:"09:45"},
  ]},
  {id:"c3",sId:"s4",sName:"Tambak Pak Budi",em:"🦐",lastMsg:"Bisa nego untuk order 100kg ke atas",time:"Kemarin",unread:0,msgs:[
    {from:"them",text:"Pak, udang vaname size 30 ada?",time:"Kemarin 14:00"},
    {from:"me",text:"Ada pak, size 30 harga 95rb/kg",time:"Kemarin 14:05"},
    {from:"them",text:"Bisa nego untuk order 100kg ke atas",time:"Kemarin 14:10"},
  ]},
  {id:"c4",sId:"s5",sName:"Nelayan Bitung",em:"🐟",lastMsg:"Cold chain terjaga, dikirim hari ini",time:"Kemarin",unread:0,msgs:[
    {from:"them",text:"Tuna segar ada berapa kg stok hari ini?",time:"Kemarin 08:00"},
    {from:"me",text:"Hari ini dapat 200kg, super fresh",time:"Kemarin 08:10"},
    {from:"them",text:"Cold chain terjaga, dikirim hari ini",time:"Kemarin 08:15"},
  ]},
];

const WEATHER_D=[
  {day:"Hari Ini",em:"⛅",temp:"28°C",rain:"40%",wind:"12km/h",info:"Berawan, cocok untuk panen pagi"},
  {day:"Besok",em:"🌧️",temp:"25°C",rain:"80%",wind:"18km/h",info:"Hujan lebat, tunda pemupukan"},
  {day:"Lusa",em:"☀️",temp:"32°C",rain:"10%",wind:"8km/h",info:"Cerah, ideal untuk pengeringan"},
  {day:"3 Hari",em:"🌤️",temp:"30°C",rain:"25%",wind:"10km/h",info:"Cerah berawan, baik untuk tanam"},
  {day:"4 Hari",em:"☀️",temp:"33°C",rain:"5%",wind:"7km/h",info:"Sangat cerah, waspada kekeringan"},
];

const KOMODITAS_D=[
  {name:"Gabah",price:8000,change:+200,unit:"kg",em:"🌾"},
  {name:"Cabai Merah",price:35000,change:-2000,unit:"kg",em:"🌶️"},
  {name:"Bawang Merah",price:28000,change:+1500,unit:"kg",em:"🧅"},
  {name:"Kopi Arabica",price:120000,change:+5000,unit:"kg",em:"☕"},
  {name:"Sawit TBS",price:1800,change:-100,unit:"kg",em:"🌴"},
  {name:"Karet RSS1",price:18000,change:+800,unit:"kg",em:"🌿"},
  {name:"Tuna Sirip",price:65000,change:+3000,unit:"kg",em:"🐟"},
  {name:"Udang Vaname",price:85000,change:-1000,unit:"kg",em:"🦐"},
  {name:"Kakao",price:45000,change:+2000,unit:"kg",em:"🍫"},
  {name:"Cengkeh",price:95000,change:-3000,unit:"kg",em:"🌺"},
];

// ═══════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════
const LOGO_DATA_URI = "data:image/png;base64,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";
const Logo=({size=40})=>(
  <img src={LOGO_DATA_URI} alt="TALARA" style={{width:size,height:size,objectFit:"contain",display:"block"}}/>
);

const Card=({children,style={},onClick,...rest})=>(
  <div onClick={onClick} style={{background:C.white,borderRadius:16,padding:16,boxShadow:"0 1px 8px rgba(0,0,0,0.07)",...style}} {...rest}>{children}</div>
);
const Btn=({children,onClick,v="primary",full=false,sm=false,style={}})=>{
  const vs={primary:{background:C.greenGrad,color:C.white},blue:{background:C.blueGrad,color:C.white},gold:{background:C.goldGrad,color:C.dark},outline:{background:"transparent",color:C.green,border:`2px solid ${C.green}`},ghost:{background:C.grayLight,color:C.dark},danger:{background:C.danger,color:C.white},teal:{background:C.teal,color:C.white}};
  return <button onClick={onClick} style={{border:"none",borderRadius:12,padding:sm?"7px 14px":"11px 18px",cursor:"pointer",fontWeight:700,fontSize:sm?12:14,display:"flex",alignItems:"center",justifyContent:"center",gap:6,width:full?"100%":"auto",fontFamily:"inherit",...vs[v],...style}}>{children}</button>;
};
const Inp=({ph,val,onChange,icon,type="text",style={}})=>(
  <div style={{position:"relative",...style}}>
    {icon&&<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:15,pointerEvents:"none"}}>{icon}</span>}
    <input type={type} placeholder={ph} value={val} onChange={onChange} style={{width:"100%",border:`1.5px solid ${C.grayLight}`,borderRadius:12,padding:icon?"10px 12px 10px 38px":"10px 14px",fontSize:14,outline:"none",background:C.white,boxSizing:"border-box",fontFamily:"inherit"}}/>
  </div>
);
const Stars=({r})=><span style={{color:C.gold,fontSize:12}}>{"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}<span style={{color:C.mid,fontWeight:600,marginLeft:4}}>{r}</span></span>;
const Badge=({children,color=C.green})=><span style={{background:color+"22",color,fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>{children}</span>;
const TpB=({amt})=><span style={{background:C.goldPale,color:C.goldDark,fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:20}}>💰{fmtTP(amt)}</span>;
const Div=()=><div style={{height:1,background:C.grayLight,margin:"12px 0"}}/>;
const SH=({title,action,onAction})=>(
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
    <div style={{fontWeight:800,fontSize:15,color:C.dark}}>{title}</div>
    {action&&<span onClick={onAction} style={{fontSize:12,color:C.green,cursor:"pointer",fontWeight:600}}>{action} ›</span>}
  </div>
);
const Chip=({children,active,onClick,color=C.green})=>(
  <button onClick={onClick} style={{flex:"0 0 auto",background:active?color:C.white,color:active?C.white:C.mid,border:`1.5px solid ${active?color:C.grayLight}`,borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,fontFamily:"inherit"}}>{children}</button>
);
const BackBtn=({onClick})=>(
  <button onClick={onClick} style={{background:"rgba(255,255,255,0.2)",border:"none",color:C.white,borderRadius:10,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18}}>←</button>
);
const Toast=({msg,show})=>show?<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dark,color:C.white,padding:"10px 20px",borderRadius:20,fontSize:13,fontWeight:600,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>{msg}</div>:null;

// Status badge
const StatusB=({status})=>{
  const m={dikirim:[C.blue,"📦 Dikirim"],selesai:[C.green,"✅ Selesai"],diproses:[C.warn,"⏳ Diproses"],dibatalkan:[C.danger,"❌ Dibatalkan"]};
  const [color,label]=m[status]||[C.mid,status];
  return <Badge color={color}>{label}</Badge>;
};

// ═══════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════
const Onboarding=({onDone})=>{
  const [step,setStep]=useState(0);
  const slides=[
    {imgs:["/img-pertanian.jpg","/img-perkebunan.jpg","/img-nelayan.jpg"],title:"Selamat Datang di TALARA",sub:"Super-app pertanian, perkebunan & nelayan terlengkap. Indonesia untuk Dunia.",bg:C.greenGrad},
    {em:"🛒🚫👨‍💼",title:"Marketplace Tanpa Tengkulak",sub:"Jual beli langsung. Petani dapat harga terbaik. Pembeli dapat produk segar harga wajar.",bg:C.blueGrad},
    {em:"💰⚡🔐",title:"TALPAY — Uang Digital TALARA",sub:"1 TALPAY = Rp 500. Aman, tercatat, mudah. Topup dari bank & minimarket mana saja.",bg:C.goldGrad},
  ];
  const s=slides[step];
  return(
    <div style={{minHeight:"100vh",background:s.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"60px 28px 48px",transition:"background 0.4s"}}>
      <div style={{textAlign:"center"}}>
        <Logo size={80}/>
        {s.imgs
          ?<div style={{display:"flex",gap:0,margin:"20px 0 12px",justifyContent:"center",borderRadius:16,overflow:"hidden",boxShadow:"0 6px 24px rgba(0,0,0,0.3)"}}>
            {s.imgs.map((src,i)=><img key={i} src={src} alt="" style={{width:90,height:120,objectFit:"cover",display:"block"}}/>)}
          </div>
          :<div style={{fontSize:70,margin:"20px 0 12px"}}>{s.em}</div>
        }
        <div style={{color:C.white,fontWeight:900,fontSize:24,lineHeight:1.3,marginBottom:14}}>{s.title}</div>
        <div style={{color:"rgba(255,255,255,0.85)",fontSize:15,lineHeight:1.75}}>{s.sub}</div>
      </div>
      <div style={{width:"100%"}}>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:32}}>
          {slides.map((_,i)=><div key={i} style={{width:i===step?28:8,height:8,borderRadius:4,background:i===step?"white":"rgba(255,255,255,0.35)",transition:"all 0.3s"}}/>)}
        </div>
        {step<2
          ?<Btn full onClick={()=>setStep(s=>s+1)} style={{borderRadius:16,fontSize:16,padding:"14px 0",background:C.white,color:C.green}}>Lanjut →</Btn>
          :<Btn full onClick={onDone} style={{borderRadius:16,fontSize:16,padding:"14px 0",background:C.white,color:C.green}}>🚀 Mulai Gunakan TALARA</Btn>
        }
        {step<2&&<div onClick={onDone} style={{textAlign:"center",color:"rgba(255,255,255,0.65)",fontSize:13,marginTop:16,cursor:"pointer"}}>Lewati</div>}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════
const HomeScreen=({onNav,cartCount,onProduct,onAddCart,onLive,notifCount})=>{
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("semua");
  const filtered=PRODS.filter(p=>(cat==="semua"||p.cat===cat)&&(search===""||p.name.toLowerCase().includes(search.toLowerCase())));
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"18px 16px 22px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Logo size={38}/>
            <div>
              <div style={{color:C.white,fontWeight:900,fontSize:19,letterSpacing:0.5}}>TALARA</div>
              <div style={{color:"rgba(255,255,255,0.65)",fontSize:9}}>Farm·Plantation·Aquaculture·Fishery</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>onNav("notif")} style={{background:"rgba(255,255,255,0.2)",border:"none",color:C.white,borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",fontSize:18}}>
              🔔{notifCount>0&&<span style={{position:"absolute",top:-3,right:-3,background:C.danger,color:C.white,fontSize:8,borderRadius:10,padding:"1px 4px",fontWeight:800}}>{notifCount}</span>}
            </button>
            <button onClick={()=>onNav("cart")} style={{background:"rgba(255,255,255,0.2)",border:"none",color:C.white,borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",fontSize:18}}>
              🛒{cartCount>0&&<span style={{position:"absolute",top:-3,right:-3,background:C.danger,color:C.white,fontSize:8,borderRadius:10,padding:"1px 4px",fontWeight:800}}>{cartCount}</span>}
            </button>
          </div>
        </div>
        <Inp ph="Cari produk tani, kebun, nelayan, pancing..." val={search} onChange={e=>setSearch(e.target.value)} icon="🔍"/>
      </div>
      <div style={{padding:"0 16px"}}>
        {/* TALPAY */}
        <div onClick={()=>onNav("talpay")} style={{background:C.goldGrad,borderRadius:16,padding:"12px 16px",marginTop:14,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 4px 15px rgba(245,200,66,0.35)"}}>
          <div>
            <div style={{fontWeight:800,fontSize:13,color:C.dark}}>💰 Saldo TALPAY Saya</div>
            <div style={{fontSize:24,fontWeight:900,color:C.dark,lineHeight:1}}>2.500 <span style={{fontSize:13}}>TP</span></div>
            <div style={{fontSize:11,color:C.dark+"88"}}>= Rp 1.250.000</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:C.dark,opacity:.7}}>1 TP = Rp 500</div>
            <div style={{marginTop:8,background:"rgba(0,0,0,0.12)",borderRadius:8,padding:"4px 12px",fontSize:12,color:C.dark,fontWeight:700}}>Kelola ›</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{display:"flex",gap:6,marginTop:14}}>
          {[{em:"🛒",l:"Beli",a:"market"},{em:"🔴",l:"Live",a:"live_list"},{em:"📤",l:"Jual",a:"jual"},{em:"💱",l:"TALPAY",a:"talpay"},{em:"📊",l:"Harga",a:"info"},{em:"🌤️",l:"Cuaca",a:"cuaca"}].map(q=>(
            <button key={q.l} onClick={()=>onNav(q.a)} style={{flex:1,background:C.white,border:"none",borderRadius:12,padding:"10px 2px",cursor:"pointer",boxShadow:"0 1px 6px rgba(0,0,0,0.07)",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:"inherit"}}>
              <span style={{fontSize:20}}>{q.em}</span>
              <span style={{fontSize:9,fontWeight:700,color:C.mid}}>{q.l}</span>
            </button>
          ))}
        </div>

        {/* Promo Banner */}
        <div style={{background:"linear-gradient(135deg,#1565A8,#2E9B3F)",borderRadius:16,padding:"14px 16px",marginTop:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:C.white,fontWeight:800,fontSize:14}}>🎉 Promo Ongkir Gratis!</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,marginTop:3}}>Semua produk pertanian hari ini</div>
            <div style={{marginTop:8}}><Badge color={C.gold}>Berlaku s/d 23:59</Badge></div>
          </div>
          <div style={{fontSize:50}}>🚚</div>
        </div>

        {/* Live */}
        <div style={{marginTop:18}}>
          <SH title="🔴 Live Sekarang" action="Lihat Semua" onAction={()=>onNav("live_list")}/>
          <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:6}}>
            {LIVES.map(ls=>(
              <div key={ls.id} onClick={()=>onLive(ls)} style={{flex:"0 0 138px",background:C.dark,borderRadius:16,overflow:"hidden",cursor:"pointer",height:188,position:"relative"}}>
                <div style={{background:`linear-gradient(180deg,transparent 15%,${C.dark}ee)`,position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:10}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{background:C.danger,color:C.white,fontSize:8,fontWeight:800,padding:"2px 7px",borderRadius:20}}>● LIVE</span>
                    <span style={{background:"rgba(0,0,0,0.5)",color:C.white,fontSize:9,padding:"2px 6px",borderRadius:20}}>👁{ls.viewers}</span>
                  </div>
                  <div style={{fontSize:42,textAlign:"center"}}>{ls.em}</div>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,color:C.white}}>{ls.seller}</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,0.7)"}}>{ls.product}</div>
                    <div style={{fontSize:10,color:C.gold,fontWeight:700,marginTop:3}}>Rp {fmt(ls.price)}/{PRODS.find(p=>p.sId===ls.sId)?.unit||"kg"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card style={{marginTop:14,background:`linear-gradient(135deg,${C.greenPale},${C.bluePale})`}}>
          <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:10}}>📊 TALARA — Siap Diluncurkan</div>
          <div style={{display:"flex",justifyContent:"space-around",textAlign:"center"}}>
            {[["5","Kategori Produk"],["3","Provinsi Pilot"],["1 TP","= Rp 500"],["100%","Fitur Siap Uji"]].map(([v,l])=>(
              <div key={l}><div style={{fontSize:15,fontWeight:900,color:C.green}}>{v}</div><div style={{fontSize:9,color:C.mid,marginTop:2}}>{l}</div></div>
            ))}
          </div>
        </Card>

        {/* Cats */}
        <div style={{marginTop:18}}>
          <SH title="Kategori"/>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:6}}>
            {CATS.map(c=><Chip key={c.k} active={cat===c.k} onClick={()=>setCat(c.k)}>{c.em} {c.l}</Chip>)}
          </div>
        </div>

        {/* Products */}
        <div style={{marginTop:14}}>
          <SH title={`${cat==="semua"?"Produk Terbaru":CATS.find(c=>c.k===cat)?.l} (${filtered.length})`} action="Lihat Semua" onAction={()=>onNav("market")}/>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {filtered.map(p=>(
              <div key={p.id} style={{flex:"0 0 calc(50% - 5px)",background:C.white,borderRadius:14,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.07)",cursor:"pointer"}} onClick={()=>onProduct(p)}>
                <div style={{background:`linear-gradient(135deg,${C.greenPale},${C.bluePale})`,height:88,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44}}>{p.em}</div>
                <div style={{padding:"10px 10px 12px"}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.3,marginBottom:3}}>{p.name}</div>
                  <div style={{fontSize:10,color:C.grayMid,marginBottom:4}}>📍{p.loc.split(",")[0]}</div>
                  <div style={{fontSize:13,fontWeight:900,color:C.green}}>Rp {fmt(p.price)}<span style={{fontSize:9,fontWeight:400,color:C.mid}}>/{p.unit}</span></div>
                  <div style={{margin:"4px 0"}}><TpB amt={p.tp}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:9,color:C.grayMid}}>⭐{p.rating}·{p.sold} terjual</span>
                    <button onClick={e=>{e.stopPropagation();onAddCart(p);}} style={{background:C.green,color:C.white,border:"none",borderRadius:8,width:24,height:24,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// MARKETPLACE
// ═══════════════════════════════════════════════
const MarketScreen=({onProduct,onAddCart,onBack})=>{
  const [q,setQ]=useState("");
  const [cat,setCat]=useState("semua");
  const [sort,setSort]=useState("terbaru");
  const filtered=PRODS.filter(p=>(cat==="semua"||p.cat===cat)&&(q===""||p.name.toLowerCase().includes(q.toLowerCase())))
    .sort((a,b)=>sort==="murah"?a.price-b.price:sort==="mahal"?b.price-a.price:sort==="rating"?b.rating-a.rating:b.id-a.id);
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>🛒 Marketplace TALARA</div>
        </div>
        <Inp ph="Cari produk..." val={q} onChange={e=>setQ(e.target.value)} icon="🔍"/>
      </div>
      <div style={{padding:"12px 16px 0"}}>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8}}>
          {CATS.map(c=><Chip key={c.k} active={cat===c.k} onClick={()=>setCat(c.k)}>{c.em} {c.l}</Chip>)}
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8}}>
          {[["terbaru","🆕 Terbaru"],["murah","⬇️ Termurah"],["mahal","⬆️ Termahal"],["rating","⭐ Rating"]].map(([k,l])=><Chip key={k} active={sort===k} onClick={()=>setSort(k)} color={C.blue}>{l}</Chip>)}
        </div>
        <div style={{fontSize:12,color:C.grayMid,marginBottom:10}}>{filtered.length} produk ditemukan</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {filtered.map(p=>(
            <div key={p.id} style={{flex:"0 0 calc(50% - 5px)",background:C.white,borderRadius:14,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.07)",cursor:"pointer"}} onClick={()=>onProduct(p)}>
              <div style={{background:`linear-gradient(135deg,${C.greenPale},${C.bluePale})`,height:88,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44}}>{p.em}</div>
              <div style={{padding:"10px 10px 12px"}}>
                <div style={{fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.3,marginBottom:3}}>{p.name}</div>
                <div style={{fontSize:10,color:C.grayMid,marginBottom:4}}>📍{p.loc.split(",")[0]}</div>
                <div style={{fontSize:13,fontWeight:900,color:C.green}}>Rp {fmt(p.price)}<span style={{fontSize:9,fontWeight:400,color:C.mid}}>/{p.unit}</span></div>
                <div style={{margin:"4px 0"}}><TpB amt={p.tp}/></div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <Stars r={p.rating}/>
                  <button onClick={e=>{e.stopPropagation();onAddCart(p);}} style={{background:C.green,color:C.white,border:"none",borderRadius:8,width:24,height:24,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// PRODUCT DETAIL
// ═══════════════════════════════════════════════
const ProductDetail=({product,onBack,onAddCart,onBuy,onStartChat})=>{
  const [qty,setQty]=useState(1);
  const [tab,setTab]=useState("info");
  if(!product)return null;
  const seller=SELLERS[product.sId]||{};
  return(
    <div style={{paddingBottom:100}}>
      <div style={{position:"relative"}}>
        <div style={{background:`linear-gradient(135deg,${C.greenPale},${C.bluePale})`,height:210,display:"flex",alignItems:"center",justifyContent:"center",fontSize:96}}>{product.em}</div>
        <button onClick={onBack} style={{position:"absolute",top:14,left:14,background:C.white,border:"none",borderRadius:20,width:36,height:36,fontSize:18,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
      </div>
      <div style={{padding:16}}>
        <Badge color={C.green}>{CATS.find(c=>c.k===product.cat)?.em} {CATS.find(c=>c.k===product.cat)?.l}</Badge>
        <div style={{fontSize:20,fontWeight:900,color:C.dark,margin:"8px 0 4px",lineHeight:1.3}}>{product.name}</div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><Stars r={product.rating}/><span style={{fontSize:11,color:C.grayMid}}>({product.sold} terjual)</span></div>
        <div style={{fontSize:26,fontWeight:900,color:C.green}}>Rp {fmt(product.price)}<span style={{fontSize:13,fontWeight:400,color:C.mid}}>/{product.unit}</span></div>
        <div style={{marginTop:4}}><TpB amt={product.tp}/> <span style={{fontSize:11,color:C.grayMid}}>per {product.unit}</span></div>

        {/* Seller */}
        <Card style={{marginTop:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{width:44,height:44,background:C.greenPale,borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{seller.em}</div>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>{seller.name}</div>
                <div style={{fontSize:11,color:C.grayMid}}>📍{seller.loc}</div>
                <div style={{fontSize:10,color:C.grayMid}}>⭐{seller.rating} · {fmt(seller.sold)} terjual</div>
              </div>
            </div>
            <Btn v="outline" sm onClick={()=>onStartChat(product.sId)}>💬 Chat</Btn>
          </div>
        </Card>

        {/* Tabs */}
        <div style={{display:"flex",background:C.grayLight,borderRadius:12,padding:4,marginTop:14}}>
          {[["info","📋 Info"],["ulasan","⭐ Ulasan"],["kirim","🚚 Kirim"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{flex:1,background:tab===k?C.white:"transparent",border:"none",borderRadius:9,padding:"8px 4px",fontSize:12,fontWeight:tab===k?800:500,color:tab===k?C.dark:C.grayMid,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>

        {tab==="info"&&<Card style={{marginTop:10}}>
          <div style={{fontSize:13,color:C.mid,lineHeight:1.7}}>{product.desc}</div>
          <Div/>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {[["📍 Lokasi",product.loc],["📦 Stok",`${fmt(product.stock)} ${product.unit}`],["🏷️ Kategori",CATS.find(c=>c.k===product.cat)?.l||"-"]].map(([k,v])=>(
              <div key={k} style={{flex:"0 0 calc(50% - 4px)",fontSize:12}}><span style={{color:C.grayMid}}>{k}:</span><br/><span style={{fontWeight:700,color:C.dark}}>{v}</span></div>
            ))}
          </div>
        </Card>}

        {tab==="ulasan"&&<div style={{marginTop:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
            <div style={{textAlign:"center",background:C.greenPale,borderRadius:12,padding:"12px 16px"}}>
              <div style={{fontSize:34,fontWeight:900,color:C.green}}>{product.rating}</div>
              <Stars r={product.rating}/>
              <div style={{fontSize:10,color:C.grayMid}}>{product.reviews?.length||0} ulasan</div>
            </div>
          </div>
          {product.reviews?.map((rv,i)=>(
            <Card key={i} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontWeight:700,fontSize:13}}>{rv.u}</span>
                <Stars r={rv.s}/>
              </div>
              <div style={{fontSize:12,color:C.mid}}>{rv.c}</div>
            </Card>
          ))}
        </div>}

        {tab==="kirim"&&<Card style={{marginTop:10}}>
          {[["🚚 JNE Regular","2-3 hari · Rp 18.000"],["⚡ JNE YES","1 hari · Rp 32.000"],["📦 J&T Express","2-4 hari · Rp 15.000"],["🏎️ SiCepat BEST","1-2 hari · Rp 22.000"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.grayLight}`}}>
              <span style={{fontSize:13,fontWeight:600}}>{k}</span>
              <span style={{fontSize:12,color:C.mid}}>{v}</span>
            </div>
          ))}
          <div style={{marginTop:10,padding:10,background:C.greenPale,borderRadius:10,fontSize:12,color:C.green}}>✅ Gratis ongkir min. pembelian 10 {product.unit}</div>
        </Card>}

        {/* Qty selector */}
        <Card style={{marginTop:12}}>
          <div style={{fontWeight:700,marginBottom:10}}>Jumlah Pesanan</div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={()=>setQty(Math.max(1,qty-1))} style={{width:36,height:36,borderRadius:8,border:`1.5px solid ${C.green}`,background:C.white,color:C.green,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
            <span style={{fontSize:18,fontWeight:900,minWidth:32,textAlign:"center"}}>{qty}</span>
            <button onClick={()=>setQty(qty+1)} style={{width:36,height:36,borderRadius:8,border:"none",background:C.green,color:C.white,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            <span style={{fontSize:12,color:C.grayMid}}>{product.unit}</span>
          </div>
          <div style={{marginTop:10,padding:10,background:C.greenPale,borderRadius:10}}>
            <div style={{fontSize:13}}>Total: <strong style={{color:C.green}}>Rp {fmt(product.price*qty)}</strong></div>
            <div style={{fontSize:11,color:C.goldDark}}>= {fmtTP(product.tp*qty)}</div>
          </div>
        </Card>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"10px 16px",background:C.white,boxShadow:"0 -2px 12px rgba(0,0,0,0.1)",display:"flex",gap:10,maxWidth:480,margin:"0 auto",boxSizing:"border-box"}}>
        <Btn v="outline" onClick={()=>onAddCart(product,qty)} style={{flex:1}}>🛒 Keranjang</Btn>
        <Btn v="primary" onClick={()=>onBuy(product,qty)} style={{flex:1}}>⚡ Beli Sekarang</Btn>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// CART
// ═══════════════════════════════════════════════
const CartScreen=({cart,onBack,onRemove,onCheckout})=>{
  const [pay,setPay]=useState("talpay");
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const totalTP=cart.reduce((s,i)=>s+i.tp*i.qty,0);
  return(
    <div style={{paddingBottom:100}}>
      <div style={{padding:"16px 16px 0",display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>←</button>
        <div style={{fontSize:17,fontWeight:800,color:C.dark}}>🛒 Keranjang ({cart.length})</div>
      </div>
      <div style={{padding:"0 16px"}}>
        {cart.length===0?(
          <div style={{textAlign:"center",padding:60,color:C.grayMid}}>
            <div style={{fontSize:64}}>🛒</div>
            <div style={{fontWeight:700,marginTop:12,fontSize:16}}>Keranjang Kosong</div>
            <div style={{fontSize:13,marginTop:6}}>Yuk belanja produk segar!</div>
          </div>
        ):(
          <>
            {cart.map((item,i)=>(
              <Card key={i} style={{marginBottom:10}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{fontSize:40,background:C.greenPale,borderRadius:12,width:54,height:54,display:"flex",alignItems:"center",justifyContent:"center"}}>{item.em}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13}}>{item.name}</div>
                    <div style={{fontSize:11,color:C.grayMid}}>Qty: {item.qty} {item.unit}</div>
                    <div style={{fontSize:14,fontWeight:900,color:C.green}}>Rp {fmt(item.price*item.qty)}</div>
                    <TpB amt={item.tp*item.qty}/>
                  </div>
                  <button onClick={()=>onRemove(i)} style={{background:"#FFEBEE",border:"none",borderRadius:8,padding:8,cursor:"pointer",color:C.danger,fontSize:16}}>🗑</button>
                </div>
              </Card>
            ))}
            <Card style={{marginTop:4}}>
              <div style={{fontWeight:700,marginBottom:10}}>💳 Metode Pembayaran</div>
              {[["talpay","💰 TALPAY","Bayar pakai saldo TALPAY"],["transfer","🏦 Transfer Bank","BRI · BNI · Mandiri · BSI"],["qris","📱 QRIS","GoPay · OVO · Dana · ShopeePay"]].map(([k,l,s])=>(
                <div key={k} onClick={()=>setPay(k)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.grayLight}`,cursor:"pointer"}}>
                  <div style={{width:20,height:20,borderRadius:10,border:`2px solid ${pay===k?C.green:C.grayMid}`,background:pay===k?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {pay===k&&<div style={{width:8,height:8,borderRadius:4,background:C.white}}/>}
                  </div>
                  <div><div style={{fontSize:13,fontWeight:600}}>{l}</div><div style={{fontSize:11,color:C.grayMid}}>{s}</div></div>
                </div>
              ))}
            </Card>
            <Card style={{marginTop:10,background:C.greenPale}}>
              {[["Subtotal",`Rp ${fmt(total)}`],["Ongkos Kirim","Rp 18.000"],["Diskon Ongkir","− Rp 18.000"],["Total TALPAY",fmtTP(totalTP)]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}>
                  <span style={{color:C.mid}}>{k}</span>
                  <span style={{fontWeight:600,color:k.includes("Diskon")?C.danger:C.dark}}>{v}</span>
                </div>
              ))}
              <Div/>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontWeight:800,fontSize:14}}>Total Bayar</span>
                <span style={{fontWeight:900,fontSize:16,color:C.green}}>Rp {fmt(total)}</span>
              </div>
            </Card>
          </>
        )}
      </div>
      {cart.length>0&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"10px 16px",background:C.white,boxShadow:"0 -2px 12px rgba(0,0,0,0.1)",maxWidth:480,margin:"0 auto",boxSizing:"border-box"}}>
          <Btn full v="primary" onClick={onCheckout}>⚡ Bayar Sekarang · Rp {fmt(total)}</Btn>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════
// CHECKOUT SUCCESS
// ═══════════════════════════════════════════════
const CheckoutOK=({onHome,onOrders})=>{
  const id=`TAL${Date.now().toString().slice(-6)}`;
  return(
    <div style={{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,textAlign:"center"}}>
      <div style={{fontSize:80}}>🎉</div>
      <div style={{fontWeight:900,fontSize:22,color:C.green,marginTop:12}}>Pesanan Berhasil!</div>
      <div style={{fontSize:13,color:C.grayMid,marginTop:8,lineHeight:1.7}}>Terima kasih sudah belanja di TALARA.<br/>Penjual sedang memproses pesananmu.</div>
      <Card style={{marginTop:18,width:"100%",background:C.greenPale}}>
        <div style={{fontSize:12,color:C.grayMid}}>No. Pesanan</div>
        <div style={{fontWeight:900,fontSize:16,color:C.green,margin:"4px 0"}}>#{id}</div>
        <StatusB status="diproses"/>
      </Card>
      <div style={{display:"flex",gap:10,marginTop:18,width:"100%"}}>
        <Btn v="outline" onClick={onOrders} style={{flex:1}}>📦 Lacak</Btn>
        <Btn v="primary" onClick={onHome} style={{flex:1}}>🏠 Beranda</Btn>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// LIVE SCREEN
// ═══════════════════════════════════════════════
const LiveList=({onLive,onBack})=>(
  <div style={{paddingBottom:90}}>
    <div style={{background:C.blueGrad,padding:"16px 16px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <BackBtn onClick={onBack}/>
        <div style={{color:C.white,fontWeight:800,fontSize:17}}>🔴 Semua Live</div>
      </div>
    </div>
    <div style={{padding:16}}>
      <div style={{fontSize:12,color:C.grayMid,marginBottom:12}}>4 siaran live berlangsung sekarang</div>
      {LIVES.map(ls=>(
        <Card key={ls.id} style={{marginBottom:10,cursor:"pointer"}} onClick={()=>onLive(ls)}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:64,height:64,background:C.dark,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,position:"relative"}}>
              {ls.em}
              <span style={{position:"absolute",top:4,right:4,background:C.danger,color:C.white,fontSize:7,fontWeight:800,padding:"1px 4px",borderRadius:10}}>●</span>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14}}>{ls.seller}</div>
              <div style={{fontSize:12,color:C.mid,marginTop:2}}>{ls.product}</div>
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <Badge color={C.danger}>🔴 LIVE</Badge>
                <Badge color={C.blue}>👁 {ls.viewers} penonton</Badge>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:13,fontWeight:800,color:C.green}}>Rp {fmt(ls.price)}</div>
              <div style={{fontSize:10,color:C.danger,textDecoration:"line-through"}}>Rp {fmt(ls.origPrice)}</div>
              <Badge color={C.danger}>LIVE DISC</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const LiveRoom=({session,onBack,onAddCart})=>{
  const [chat,setChat]=useState([
    {user:"Pak Budi",msg:"Berapa harga per kilo pak?",time:"10:15"},
    {user:"Bu Sri",msg:"Kirim ke Surabaya bisa?",time:"10:16"},
    {user:"Ahmad_123",msg:"Stok masih ada pak?",time:"10:17"},
    {user:"Ibu_Cantik",msg:"Mau beli 50kg bisa request?",time:"10:18"},
    {user:"Pak_Hasan",msg:"Ini organik beneran?",time:"10:19"},
  ]);
  const [msg,setMsg]=useState("");
  const [bought,setBought]=useState(false);
  const chatRef=useRef(null);
  useEffect(()=>{
    if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;
    const t=setInterval(()=>{
      const bots=[{u:"PenontonA",m:"Lanjut pak, bagus banget!"},{u:"FarmerFans",m:"Mau order langsung dari sini"},{u:"BuyerB",m:"Harga menarik nih!"},{u:"AgroLover",m:"Semangat pak!"}];
      const b=bots[Math.floor(Math.random()*bots.length)];
      setChat(c=>[...c,{user:b.u,msg:b.m,time:new Date().toLocaleTimeString("id",{hour:"2-digit",minute:"2-digit"})}]);
    },3000);
    return()=>clearInterval(t);
  },[]);
  const send=()=>{if(msg.trim()){setChat(c=>[...c,{user:"Kamu",msg:msg,time:new Date().toLocaleTimeString("id",{hour:"2-digit",minute:"2-digit"}),isMe:true}]);setMsg("");}};
  if(!session)return null;
  const prod=PRODS.find(p=>p.sId===session.sId)||PRODS[0];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:C.dark,maxWidth:480,margin:"0 auto"}}>
      {/* Video */}
      <div style={{flex:1,background:`linear-gradient(180deg,#0a1628,#1a2d4a)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",minHeight:0}}>
        <div style={{fontSize:80}}>{session.em}</div>
        <div style={{position:"absolute",top:0,left:0,right:0,display:"flex",justifyContent:"space-between",padding:12}}>
          <button onClick={onBack} style={{background:"rgba(0,0,0,0.5)",border:"none",color:C.white,borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:13}}>← Keluar</button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{background:C.danger,color:C.white,fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:20}}>● LIVE</span>
            <span style={{background:"rgba(0,0,0,0.5)",color:C.white,fontSize:10,padding:"3px 8px",borderRadius:20}}>👁 {session.viewers+(chat.length*3)}</span>
          </div>
        </div>
        <div style={{position:"absolute",bottom:12,left:12}}>
          <div style={{color:C.white,fontWeight:800,fontSize:13}}>{session.seller}</div>
          <div style={{color:"rgba(255,255,255,0.75)",fontSize:11}}>{session.product}</div>
          <div style={{display:"flex",gap:6,marginTop:4}}>
            <span style={{background:C.gold+"cc",color:C.dark,fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>Rp {fmt(session.price)}/{prod.unit}</span>
            <span style={{background:"rgba(255,0,0,0.7)",color:C.white,fontSize:9,padding:"2px 6px",borderRadius:20,textDecoration:"line-through"}}>Rp {fmt(session.origPrice)}</span>
          </div>
        </div>
        <div style={{position:"absolute",right:12,bottom:20,display:"flex",flexDirection:"column",gap:8}}>
          {["❤️","😍","🔥","👍"].map(e=><div key={e} style={{fontSize:24,cursor:"pointer"}}>{e}</div>)}
        </div>
      </div>

      {/* Chat */}
      <div ref={chatRef} style={{height:160,background:"rgba(0,0,0,0.85)",overflowY:"auto",padding:"8px 12px"}}>
        {chat.slice(-10).map((c,i)=>(
          <div key={i} style={{marginBottom:4,fontSize:12}}>
            <span style={{color:c.isMe?C.gold:C.greenLight,fontWeight:700}}>{c.user}: </span>
            <span style={{color:C.white}}>{c.msg}</span>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{background:"#111",padding:"10px 12px",display:"flex",gap:8}}>
        <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Tulis pesan..." onKeyDown={e=>e.key==="Enter"&&send()}
          style={{flex:1,background:"rgba(255,255,255,0.15)",border:"none",borderRadius:20,padding:"8px 16px",color:C.white,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={send} style={{background:C.green,border:"none",borderRadius:20,padding:"8px 16px",color:C.white,cursor:"pointer",fontWeight:700,fontSize:13}}>Kirim</button>
        <button onClick={()=>{onAddCart(prod);setBought(true);setTimeout(()=>setBought(false),2000);}} style={{background:bought?C.goldDark:C.gold,border:"none",borderRadius:20,padding:"8px 12px",color:C.dark,cursor:"pointer",fontWeight:700,fontSize:13}}>
          {bought?"✅ Dibeli":"🛒 Beli"}
        </button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// CHAT SCREENS
// ═══════════════════════════════════════════════
const ChatList=({chats,onOpenChat,onBack})=>{
  const totalUnread=chats.reduce((s,c)=>s+c.unread,0);
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>💬 Pesan {totalUnread>0&&<Badge color={C.danger}>{totalUnread}</Badge>}</div>
        </div>
      </div>
      <div style={{padding:16}}>
        {chats.length===0?(
          <div style={{textAlign:"center",padding:60,color:C.grayMid}}>
            <div style={{fontSize:60}}>💬</div>
            <div style={{fontWeight:700,marginTop:12,fontSize:15}}>Belum ada pesan</div>
            <div style={{fontSize:12,marginTop:6}}>Chat dengan penjual akan muncul di sini</div>
          </div>
        ):chats.map(c=>(
          <Card key={c.id} style={{marginBottom:10,cursor:"pointer"}} onClick={()=>onOpenChat(c)}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:48,height:48,background:C.greenPale,borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,position:"relative",flexShrink:0}}>
                {c.em}
                {c.unread>0&&<div style={{position:"absolute",top:0,right:0,background:C.danger,color:C.white,fontSize:9,borderRadius:10,minWidth:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{c.unread}</div>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{fontWeight:700,fontSize:14}}>{c.sName}</div>
                  <div style={{fontSize:11,color:c.unread>0?C.green:C.grayMid,fontWeight:c.unread>0?700:400}}>{c.time}</div>
                </div>
                <div style={{fontSize:12,color:c.unread>0?C.dark:C.grayMid,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:c.unread>0?600:400}}>{c.lastMsg}</div>
              </div>
            </div>
          </Card>
        ))}
        <div style={{textAlign:"center",padding:20,color:C.grayMid,fontSize:12}}>
          <div>Pesan bersifat privat dan terenkripsi</div>
          <div>🔒 TALARA menjaga keamanan percakapanmu</div>
        </div>
      </div>
    </div>
  );
};

const ChatRoom=({chat,onBack,onUpdateChat})=>{
  const [msgs,setMsgs]=useState(chat?.msgs||[]);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{setMsgs(chat?.msgs||[]);},[chat?.id,chat?.msgs]);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[msgs,typing]);
  if(!chat)return null;
  const nowStr=()=>new Date().toLocaleTimeString("id",{hour:"2-digit",minute:"2-digit"});
  const send=()=>{
    if(!input.trim())return;
    const myMsg={from:"me",text:input,time:nowStr()};
    const afterMine=[...msgs,myMsg];
    setMsgs(afterMine);
    onUpdateChat(chat.id,{msgs:afterMine,lastMsg:input,time:myMsg.time,unread:0});
    setInput("");
    setTyping(true);
    setTimeout(()=>{
      const replies=["Baik, siap kami proses","Terima kasih sudah menghubungi kami","Oke pak/bu, bisa segera dikirim","Silakan, kami tunggu ordernya"];
      const reply=replies[Math.floor(Math.random()*replies.length)];
      const replyMsg={from:"them",text:reply,time:nowStr()};
      setMsgs(m=>{
        const updated=[...m,replyMsg];
        onUpdateChat(chat.id,{msgs:updated,lastMsg:reply,time:replyMsg.time,unread:0});
        return updated;
      });
      setTyping(false);
    },1500);
  };
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",maxWidth:480,margin:"0 auto"}}>
      {/* Header */}
      <div style={{background:C.greenGrad,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <BackBtn onClick={onBack}/>
        <div style={{width:36,height:36,background:"rgba(255,255,255,0.2)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{chat.em}</div>
        <div>
          <div style={{color:C.white,fontWeight:700,fontSize:14}}>{chat.sName}</div>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:10}}>● Online</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <button style={{background:"rgba(255,255,255,0.2)",border:"none",color:C.white,borderRadius:8,width:32,height:32,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>📞</button>
        </div>
      </div>

      {/* Messages */}
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:"12px 16px",background:C.gray,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{textAlign:"center",fontSize:11,color:C.grayMid,marginBottom:4}}>Pesan dienkripsi end-to-end 🔒</div>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"75%"}}>
              <div style={{background:m.from==="me"?C.green:C.white,color:m.from==="me"?C.white:C.dark,padding:"8px 12px",borderRadius:m.from==="me"?"16px 16px 4px 16px":"16px 16px 16px 4px",fontSize:13,boxShadow:"0 1px 4px rgba(0,0,0,0.08)",lineHeight:1.5}}>
                {m.text}
              </div>
              <div style={{fontSize:10,color:C.grayMid,marginTop:2,textAlign:m.from==="me"?"right":"left"}}>{m.time} {m.from==="me"&&"✓✓"}</div>
            </div>
          </div>
        ))}
        {typing&&(
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{background:C.white,padding:"8px 14px",borderRadius:"16px 16px 16px 4px",boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
              <div style={{display:"flex",gap:4}}>
                {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:3,background:C.grayMid,animation:"bounce 0.8s infinite",animationDelay:`${i*0.2}s`}}/>)}
              </div>
            </div>
          </div>
        )}
      </div>


      {/* Shortcuts */}
      <div style={{background:C.white,padding:"8px 16px",display:"flex",gap:8,overflowX:"auto"}}>
        {["Stok masih ada?","Bisa nego harga?","Kirim ke mana saja?","Minimum order?"].map(t=>(
          <button key={t} onClick={()=>setInput(t)} style={{flex:"0 0 auto",background:C.greenPale,border:`1px solid ${C.greenMid}`,borderRadius:16,padding:"4px 12px",fontSize:11,cursor:"pointer",color:C.green,fontWeight:600,whiteSpace:"nowrap",fontFamily:"inherit"}}>{t}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{background:C.white,padding:"10px 16px",display:"flex",gap:8,borderTop:`1px solid ${C.grayLight}`}}>
        <button style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>📎</button>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Tulis pesan..." onKeyDown={e=>e.key==="Enter"&&send()}
          style={{flex:1,border:`1.5px solid ${C.grayLight}`,borderRadius:20,padding:"8px 14px",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={send} style={{background:C.green,border:"none",borderRadius:20,width:40,height:40,color:C.white,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// TALPAY
// ═══════════════════════════════════════════════
const TalpayScreen=({onBack})=>{
  const [tab,setTab]=useState("wallet");
  const [balance]=useState(2500);
  const [topupVal,setTopupVal]=useState("");
  const [sendVal,setSendVal]=useState("");
  const [sendTo,setSendTo]=useState("");
  const [tarikVal,setTarikVal]=useState("");
  const txns=[
    {type:"in",desc:"Penjualan Gabah 50kg",amt:1600,tp:1600,date:"19 Jun",id:"TX001"},
    {type:"out",desc:"Beli Sprayer Elektrik",amt:700,tp:700,date:"18 Jun",id:"TX002"},
    {type:"in",desc:"Penjualan Cumi 20kg",amt:2200,tp:2200,date:"17 Jun",id:"TX003"},
    {type:"in",desc:"Topup via BRI",amt:1000,tp:1000,date:"16 Jun",id:"TX004"},
    {type:"out",desc:"Beli Jaring Nelayan",amt:900,tp:900,date:"15 Jun",id:"TX005"},
    {type:"in",desc:"Penjualan Kopi 5kg",amt:1200,tp:1200,date:"14 Jun",id:"TX006"},
  ];
  const tabs=[["wallet","💼 Dompet"],["topup","⬆️ Topup"],["kirim","📤 Kirim"],["tarik","⬇️ Tarik"],["history","📋 Riwayat"]];
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.goldGrad,padding:"20px 16px 28px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <BackBtn onClick={onBack}/>
          <div style={{fontWeight:900,fontSize:18,color:C.dark}}>💰 TALPAY</div>
        </div>
        <div style={{background:"rgba(0,0,0,0.15)",borderRadius:20,padding:20,textAlign:"center"}}>
          <div style={{fontSize:12,color:C.dark+"99",marginBottom:4}}>Saldo TALPAY Anda</div>
          <div style={{fontSize:44,fontWeight:900,color:C.dark,lineHeight:1}}>{fmt(balance)} <span style={{fontSize:18}}>TP</span></div>
          <div style={{fontSize:15,color:C.dark+"88",marginTop:6}}>= Rp {fmt(balance*500)}</div>
          <div style={{fontSize:12,color:C.dark+"66",marginTop:2}}>1 TALPAY = Rp 500</div>
        </div>
        <div style={{display:"flex",gap:6,marginTop:14}}>
          {tabs.map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{flex:1,background:tab===k?C.dark:"rgba(0,0,0,0.15)",color:tab===k?C.white:C.dark,border:"none",borderRadius:10,padding:"7px 2px",cursor:"pointer",fontSize:9,fontWeight:700,fontFamily:"inherit",textAlign:"center"}}>
              {l.split(" ")[0]}<br/>{l.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:16}}>
        {/* WALLET */}
        {tab==="wallet"&&<>
          <div style={{display:"flex",gap:10,marginBottom:14}}>
            {[["⬆️ Topup","topup"],["📤 Kirim","kirim"],["⬇️ Tarik","tarik"],["📋 Riwayat","history"]].map(([l,k])=>(
              <button key={k} onClick={()=>setTab(k)} style={{flex:1,background:C.white,border:`1.5px solid ${C.grayLight}`,borderRadius:12,padding:"12px 4px",cursor:"pointer",textAlign:"center",fontFamily:"inherit"}}>
                <div style={{fontSize:20}}>{l.split(" ")[0]}</div>
                <div style={{fontSize:10,fontWeight:700,color:C.mid,marginTop:4}}>{l.split(" ")[1]}</div>
              </button>
            ))}
          </div>
          <SH title="Transaksi Terbaru" action="Lihat Semua" onAction={()=>setTab("history")}/>
          {txns.slice(0,4).map(t=>(
            <Card key={t.id} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:40,height:40,background:t.type==="in"?C.greenPale:"#FFEBEE",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{t.type==="in"?"⬇️":"⬆️"}</div>
                  <div><div style={{fontSize:13,fontWeight:600}}>{t.desc}</div><div style={{fontSize:11,color:C.grayMid}}>{t.date} · {t.id}</div></div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:800,color:t.type==="in"?C.green:C.danger,fontSize:14}}>{t.type==="in"?"+":"-"}{t.tp} TP</div>
                  <div style={{fontSize:10,color:C.grayMid}}>Rp {fmt(t.amt*500)}</div>
                </div>
              </div>
            </Card>
          ))}
        </>}

        {/* TOPUP */}
        {tab==="topup"&&<Card>
          <div style={{fontWeight:800,fontSize:15,marginBottom:12}}>⬆️ Topup TALPAY</div>
          <div style={{fontSize:13,color:C.grayMid,marginBottom:10}}>Pilih nominal:</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
            {[10,20,40,100,200,400,1000,2000].map(tp=>(
              <button key={tp} onClick={()=>setTopupVal(tp)} style={{flex:"0 0 calc(25% - 6px)",padding:"10px 4px",borderRadius:10,border:`1.5px solid ${topupVal===tp?C.gold:"#E0E0E0"}`,background:topupVal===tp?C.goldPale:C.white,cursor:"pointer",textAlign:"center",fontFamily:"inherit"}}>
                <div style={{fontSize:12,fontWeight:800}}>{tp} TP</div>
                <div style={{fontSize:10,color:C.grayMid}}>Rp {fmt(tp*500)}</div>
              </button>
            ))}
          </div>
          <Inp ph="Atau ketik jumlah TP..." val={topupVal} onChange={e=>setTopupVal(e.target.value)} icon="💰" style={{marginBottom:10}}/>
          {topupVal&&<div style={{padding:10,background:C.goldPale,borderRadius:10,fontSize:13,marginBottom:10}}>Topup <strong>{topupVal} TP</strong> = Rp {fmt(topupVal*500)}</div>}
          <div style={{fontSize:12,color:C.grayMid,marginBottom:12}}>Via: Transfer Bank · QRIS · Alfamart · Indomaret</div>
          <Btn full v="gold">⬆️ Topup {topupVal?`${topupVal} TP`:""}</Btn>
        </Card>}

        {/* KIRIM */}
        {tab==="kirim"&&<Card>
          <div style={{fontWeight:800,fontSize:15,marginBottom:12}}>📤 Kirim TALPAY</div>
          <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>No. HP / ID TALARA penerima</div><Inp ph="cth: 0812xxxxxxxx" val={sendTo} onChange={e=>setSendTo(e.target.value)} icon="👤"/></div>
          <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Jumlah TALPAY</div><Inp ph="cth: 100" val={sendVal} onChange={e=>setSendVal(e.target.value)} icon="💰"/></div>
          {sendVal&&sendTo&&<div style={{padding:12,background:C.greenPale,borderRadius:10,fontSize:13,marginBottom:12}}>
            Kirim <strong>{sendVal} TP</strong> (= Rp {fmt(sendVal*500)}) ke <strong>{sendTo}</strong>
          </div>}
          <Btn full v="primary">📤 Kirim TALPAY</Btn>
          <div style={{fontSize:11,color:C.grayMid,textAlign:"center",marginTop:10}}>Gratis biaya transfer ke sesama pengguna TALARA</div>
        </Card>}

        {/* TARIK */}
        {tab==="tarik"&&<Card>
          <div style={{fontWeight:800,fontSize:15,marginBottom:12}}>⬇️ Tarik Saldo</div>
          <div style={{padding:12,background:C.greenPale,borderRadius:10,marginBottom:12}}>
            <div style={{fontSize:12,color:C.grayMid}}>Saldo tersedia</div>
            <div style={{fontSize:20,fontWeight:800}}>{fmt(balance)} TP = Rp {fmt(balance*500)}</div>
          </div>
          <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Jumlah TALPAY yang ditarik</div><Inp ph="cth: 500" val={tarikVal} onChange={e=>setTarikVal(e.target.value)} icon="💸"/></div>
          {tarikVal&&<div style={{padding:10,background:C.bluePale,borderRadius:10,fontSize:13,marginBottom:10}}>
            Tarik <strong>{tarikVal} TP</strong> = Rp {fmt(tarikVal*500)}
          </div>}
          <div style={{fontSize:12,color:C.grayMid,marginBottom:12}}>Tujuan: BRI · BNI · Mandiri · BSI · GoPay · OVO · Alfamart</div>
          <Btn full v="blue">⬇️ Tarik ke Rekening</Btn>
          <div style={{fontSize:11,color:C.grayMid,textAlign:"center",marginTop:10}}>Proses 1-3 menit · Biaya Rp 0</div>
        </Card>}

        {/* HISTORY */}
        {tab==="history"&&<>
          <div style={{fontWeight:800,fontSize:15,marginBottom:12}}>📋 Riwayat Transaksi</div>
          {txns.map(t=>(
            <Card key={t.id} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:40,height:40,background:t.type==="in"?C.greenPale:"#FFEBEE",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{t.type==="in"?"⬇️":"⬆️"}</div>
                  <div><div style={{fontSize:13,fontWeight:600}}>{t.desc}</div><div style={{fontSize:11,color:C.grayMid}}>{t.date} · {t.id}</div></div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:800,color:t.type==="in"?C.green:C.danger}}>{t.type==="in"?"+":"-"}{t.tp} TP</div>
                  <div style={{fontSize:10,color:C.grayMid}}>Rp {fmt(t.amt*500)}</div>
                  <Badge color={C.green}>Sukses</Badge>
                </div>
              </div>
            </Card>
          ))}
        </>}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// JUAL (SELLER)
// ═══════════════════════════════════════════════
const JualScreen=({onBack})=>{
  const [form,setForm]=useState({name:"",cat:"pertanian",price:"",unit:"kg",stock:"",desc:"",loc:""});
  const [done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  if(done)return(
    <div style={{padding:40,textAlign:"center",minHeight:"70vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontSize:80}}>✅</div>
      <div style={{fontWeight:900,fontSize:20,color:C.green,marginTop:14}}>Produk Berhasil Diunggah!</div>
      <div style={{fontSize:13,color:C.grayMid,marginTop:8}}>Produkmu sudah live di marketplace TALARA</div>
      <div style={{marginTop:20,width:"100%",display:"flex",flexDirection:"column",gap:10}}>
        <Btn full v="primary" onClick={()=>{setDone(false);setForm({name:"",cat:"pertanian",price:"",unit:"kg",stock:"",desc:"",loc:""});}}>+ Jual Produk Lagi</Btn>
        <Btn full v="outline" onClick={onBack}>← Kembali ke Beranda</Btn>
      </div>
    </div>
  );
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>📦 Jual Produk</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <Card style={{marginBottom:12}}>
          <div style={{fontWeight:700,marginBottom:10}}>📸 Foto Produk</div>
          <div style={{background:C.grayLight,borderRadius:12,height:120,display:"flex",alignItems:"center",justifyContent:"center",border:`2px dashed ${C.grayMid}`,cursor:"pointer"}}>
            <div style={{textAlign:"center",color:C.grayMid}}><div style={{fontSize:32}}>📷</div><div style={{fontSize:12,marginTop:4}}>Ketuk untuk upload foto</div><div style={{fontSize:10}}>JPG/PNG max 5MB</div></div>
          </div>
        </Card>
        <Card style={{marginBottom:12}}>
          <div style={{fontWeight:700,marginBottom:10}}>📝 Info Produk</div>
          <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Nama Produk *</div><Inp ph="cth: Gabah Organik Premium" val={form.name} onChange={e=>set("name",e.target.value)}/></div>
          <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Kategori *</div>
            <select value={form.cat} onChange={e=>set("cat",e.target.value)} style={{width:"100%",padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.grayLight}`,fontSize:14,background:C.white,fontFamily:"inherit"}}>
              {CATS.filter(c=>c.k!=="semua").map(c=><option key={c.k} value={c.k}>{c.em} {c.l}</option>)}
            </select>
          </div>
          <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Deskripsi Produk *</div>
            <textarea value={form.desc} onChange={e=>set("desc",e.target.value)} placeholder="Ceritakan produkmu: keunggulan, cara budidaya, sertifikasi..." style={{width:"100%",padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.grayLight}`,fontSize:14,minHeight:80,resize:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
          </div>
        </Card>
        <Card style={{marginBottom:12}}>
          <div style={{fontWeight:700,marginBottom:10}}>💰 Harga & Stok</div>
          <div style={{display:"flex",gap:10,marginBottom:10}}>
            <div style={{flex:2}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Harga (Rp) *</div><Inp ph="cth: 8000" val={form.price} onChange={e=>set("price",e.target.value)} icon="💵"/></div>
            <div style={{flex:1}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Satuan</div>
              <select value={form.unit} onChange={e=>set("unit",e.target.value)} style={{width:"100%",padding:"10px 8px",borderRadius:12,border:`1.5px solid ${C.grayLight}`,fontSize:14,background:C.white,fontFamily:"inherit"}}>
                {["kg","ton","ekor","unit","liter","ikat","bungkus"].map(u=><option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
          {form.price&&<div style={{padding:10,background:C.goldPale,borderRadius:10,fontSize:12,marginBottom:10}}>= {Math.round(form.price/500)} TALPAY per {form.unit}</div>}
          <div><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Stok Tersedia *</div><Inp ph="cth: 500" val={form.stock} onChange={e=>set("stock",e.target.value)} icon="📦"/></div>
        </Card>
        <Card style={{marginBottom:16}}>
          <div style={{fontWeight:700,marginBottom:10}}>📍 Lokasi Penjual</div>
          <Inp ph="cth: Brebes, Jawa Tengah" val={form.loc} onChange={e=>set("loc",e.target.value)} icon="📍"/>
        </Card>
        <Btn full v="primary" onClick={()=>form.name&&form.price&&setDone(true)} style={{fontSize:15,padding:"14px 0"}}>🚀 Upload & Jual Sekarang</Btn>
        <div style={{fontSize:11,color:C.grayMid,textAlign:"center",marginTop:8}}>Produk akan ditinjau dalam 1x24 jam</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// ORDERS (PESANAN)
// ═══════════════════════════════════════════════
const OrdersScreen=({onBack})=>{
  const [sel,setSel]=useState(null);
  if(sel)return(
    <div style={{paddingBottom:80}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={()=>setSel(null)}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>📦 Lacak Pesanan</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <Card style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.grayMid}}>No. Pesanan</div>
          <div style={{fontWeight:900,fontSize:16,color:C.green,margin:"4px 0"}}>#{sel.id}</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <StatusB status={sel.status}/>
            <span style={{fontSize:11,color:C.grayMid}}>{sel.date}</span>
          </div>
        </Card>
        <Card style={{marginBottom:12}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{fontSize:40}}>{sel.em}</div>
            <div>
              <div style={{fontWeight:700}}>{sel.product}</div>
              <div style={{fontSize:12,color:C.grayMid}}>{sel.seller}</div>
              <div style={{fontSize:14,fontWeight:800,color:C.green}}>Rp {fmt(sel.total)}</div>
              <TpB amt={sel.tp}/>
            </div>
          </div>
          {sel.ekspedisi&&<div style={{marginTop:10,padding:10,background:C.bluePale,borderRadius:10,fontSize:12}}>
            <div>{sel.ekspedisi} · Resi: <strong>{sel.resi}</strong></div>
          </div>}
        </Card>
        <Card>
          <div style={{fontWeight:700,marginBottom:14}}>📍 Tracking Pengiriman</div>
          {sel.steps.map((step,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:i<sel.steps.length-1?16:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:20,height:20,borderRadius:10,background:step.done?C.green:C.grayLight,border:`2px solid ${step.done?C.green:C.grayMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:C.white,fontWeight:800,flexShrink:0}}>{step.done?"✓":""}</div>
                {i<sel.steps.length-1&&<div style={{width:2,height:24,background:step.done?C.green:C.grayLight,marginTop:4}}/>}
              </div>
              <div style={{paddingBottom:8}}>
                <div style={{fontSize:13,fontWeight:step.done?700:400,color:step.done?C.dark:C.grayMid}}>{step.s}</div>
                <div style={{fontSize:11,color:C.grayMid}}>{step.t}</div>
              </div>
            </div>
          ))}
        </Card>
        {sel.status==="selesai"&&<Btn full v="primary" style={{marginTop:12}}>⭐ Beri Ulasan</Btn>}
      </div>
    </div>
  );
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>📦 Pesanan Saya</div>
        </div>
      </div>
      <div style={{padding:16}}>
        {ORDERS_D.map(o=>(
          <Card key={o.id} style={{marginBottom:10,cursor:"pointer"}} onClick={()=>setSel(o)}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontSize:12,color:C.grayMid}}>#{o.id}</div>
              <StatusB status={o.status}/>
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{fontSize:36}}>{o.em}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:13}}>{o.product}</div>
                <div style={{fontSize:11,color:C.grayMid}}>{o.seller} · {o.date}</div>
                <div style={{fontWeight:800,color:C.green,fontSize:13}}>Rp {fmt(o.total)}</div>
              </div>
              <div style={{fontSize:12,color:C.blue}}>Lacak ›</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// NOTIF
// ═══════════════════════════════════════════════
const NotifScreen=({onBack,notifs,onRead})=>(
  <div style={{paddingBottom:90}}>
    <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <BackBtn onClick={onBack}/>
        <div style={{color:C.white,fontWeight:800,fontSize:17}}>🔔 Notifikasi</div>
        <Btn v="ghost" sm onClick={onRead} style={{marginLeft:"auto",fontSize:11}}>Tandai Semua</Btn>
      </div>
    </div>
    <div style={{padding:16}}>
      {notifs.map(n=>(
        <Card key={n.id} style={{marginBottom:10,borderLeft:`4px solid ${n.read?C.grayLight:n.color}`,opacity:n.read?0.75:1}}>
          <div style={{display:"flex",gap:12}}>
            <div style={{width:44,height:44,borderRadius:22,background:n.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{n.em}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{n.title}</div>
              <div style={{fontSize:12,color:C.mid,marginTop:2,lineHeight:1.5}}>{n.desc}</div>
              <div style={{fontSize:10,color:C.grayMid,marginTop:4}}>{n.time}</div>
            </div>
            {!n.read&&<div style={{width:8,height:8,borderRadius:4,background:n.color,flexShrink:0,marginTop:4}}/>}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════
// CUACA & INFO
// ═══════════════════════════════════════════════
const CuacaScreen=({onBack})=>(
  <div style={{paddingBottom:90}}>
    <div style={{background:"linear-gradient(135deg,#1565A8,#42A5F5)",padding:"16px 16px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <BackBtn onClick={onBack}/>
        <div style={{color:C.white,fontWeight:800,fontSize:17}}>🌤️ Info Cuaca & Alam</div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:64}}>{WEATHER_D[0].em}</div>
        <div style={{color:C.white,fontSize:36,fontWeight:900}}>{WEATHER_D[0].temp}</div>
        <div style={{color:"rgba(255,255,255,0.8)",fontSize:14}}>{WEATHER_D[0].desc} · Klaten, Jawa Tengah</div>
        <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:10,fontSize:12,color:"rgba(255,255,255,0.75)"}}>
          <span>💧 Hujan: {WEATHER_D[0].rain}</span>
          <span>💨 Angin: {WEATHER_D[0].wind}</span>
        </div>
      </div>
    </div>
    <div style={{padding:16}}>
      <SH title="📅 Prakiraan 5 Hari"/>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8}}>
        {WEATHER_D.map((w,i)=>(
          <div key={i} style={{flex:"0 0 100px",background:C.white,borderRadius:14,padding:"12px 8px",textAlign:"center",boxShadow:"0 1px 8px rgba(0,0,0,0.07)"}}>
            <div style={{fontSize:10,color:C.grayMid,fontWeight:600,marginBottom:4}}>{w.day}</div>
            <div style={{fontSize:28}}>{w.em}</div>
            <div style={{fontSize:14,fontWeight:800,color:C.dark,marginTop:4}}>{w.temp}</div>
            <div style={{fontSize:10,color:C.blue}}>💧{w.rain}</div>
          </div>
        ))}
      </div>
      <Card style={{marginTop:14,background:C.greenPale}}>
        <div style={{fontWeight:700,marginBottom:8}}>🌾 Saran Pertanian Hari Ini</div>
        {WEATHER_D[0].info&&<div style={{fontSize:13,color:C.dark,lineHeight:1.6}}>
          ✅ {WEATHER_D[0].info}<br/>
          🌧️ Besok: {WEATHER_D[1].info}<br/>
          ☀️ Lusa: {WEATHER_D[2].info}
        </div>}
      </Card>
      <Card style={{marginTop:12,background:C.bluePale}}>
        <div style={{fontWeight:700,marginBottom:8}}>🌊 Info Laut & Nelayan</div>
        <div style={{fontSize:13,color:C.dark,lineHeight:1.6}}>
          🐟 Prediksi titik ikan: Perairan Laut Jawa Utara<br/>
          🌊 Tinggi gelombang: 1.2 meter (aman)<br/>
          💨 Angin laut: 12 km/h (kondisi baik)<br/>
          ⚠️ Besok: Gelombang 2.5m — tunda melaut
        </div>
      </Card>
    </div>
  </div>
);

const InfoHarga=({onBack})=>(
  <div style={{paddingBottom:90}}>
    <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <BackBtn onClick={onBack}/>
        <div style={{color:C.white,fontWeight:800,fontSize:17}}>📊 Harga Komoditas</div>
      </div>
    </div>
    <div style={{padding:16}}>
      <div style={{fontSize:12,color:C.grayMid,marginBottom:12}}>Update terakhir: 19 Jun 2026 · 10:00 WIB</div>
      {KOMODITAS_D.map(k=>(
        <Card key={k.name} style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{fontSize:28}}>{k.em}</div>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>{k.name}</div>
                <div style={{fontSize:11,color:C.grayMid}}>per {k.unit}</div>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:15,fontWeight:900,color:C.dark}}>Rp {fmt(k.price)}</div>
              <div style={{fontSize:11,fontWeight:700,color:k.change>0?C.green:C.danger}}>
                {k.change>0?"▲":"▼"} Rp {fmt(Math.abs(k.change))}
              </div>
            </div>
          </div>
        </Card>
      ))}
      <Card style={{marginTop:4,background:C.greenPale,fontSize:12,color:C.mid}}>
        💡 Harga berdasarkan data pasar induk dan TPI nasional. Update setiap hari pukul 06:00 dan 12:00 WIB.
      </Card>
    </div>
  </div>
);

// ═══════════════════════════════════════════════
// PRODUK SAYA (Seller Dashboard)
// ═══════════════════════════════════════════════
const MyProductsScreen=({onBack}) =>{
  const [tab,setTab]=useState("aktif");
  const myProds=PRODS.slice(0,6).map((p,i)=>({...p,status:i<4?"aktif":"habis",views:Math.floor(Math.random()*500)+50}));
  const filtered=myProds.filter(p=>tab==="aktif"?p.status==="aktif":p.status==="habis");
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>📦 Produk Saya</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <Card style={{marginBottom:14,background:C.greenPale}}>
          <div style={{display:"flex",justifyContent:"space-around",textAlign:"center"}}>
            {[["12","Total Produk"],["4.9","Rating Toko"],["156","Terjual"],["Rp 18,7Jt","Omzet"]].map(([v,l])=>(
              <div key={l}><div style={{fontSize:14,fontWeight:900,color:C.green}}>{v}</div><div style={{fontSize:9,color:C.mid,marginTop:2}}>{l}</div></div>
            ))}
          </div>
        </Card>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <Chip active={tab==="aktif"} onClick={()=>setTab("aktif")}>✅ Aktif (4)</Chip>
          <Chip active={tab==="habis"} onClick={()=>setTab("habis")} color={C.warn}>⚠️ Stok Habis (2)</Chip>
        </div>
        {filtered.map(p=>(
          <Card key={p.id} style={{marginBottom:10}}>
            <div style={{display:"flex",gap:12}}>
              <div style={{width:56,height:56,background:C.greenPale,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0}}>{p.em}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:13}}>{p.name}</div>
                <div style={{fontSize:11,color:C.grayMid}}>Rp {fmt(p.price)}/{p.unit} · Stok: {p.status==="habis"?0:p.stock}</div>
                <div style={{display:"flex",gap:6,marginTop:4}}>
                  <Badge color={p.status==="aktif"?C.green:C.warn}>{p.status==="aktif"?"✅ Aktif":"⚠️ Habis"}</Badge>
                  <Badge color={C.blue}>👁 {p.views} dilihat</Badge>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <Btn v="outline" sm style={{flex:1}} onClick={()=>alert(`Edit produk: ${p.name}`)}>✏️ Edit</Btn>
              <Btn v={p.status==="habis"?"gold":"ghost"} sm style={{flex:1}} onClick={()=>alert(p.status==="habis"?`Restok ${p.name}`:`${p.name} dinonaktifkan sementara`)}>{p.status==="habis"?"📦 Restok":"⏸️ Nonaktifkan"}</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// LAPORAN PENJUALAN
// ═══════════════════════════════════════════════
const SalesReportScreen=({onBack})=>{
  const [period,setPeriod]=useState("bulan");
  const data={minggu:{omzet:2850000,tp:5700,trx:14,produk:"Gabah Organik"},bulan:{omzet:18700000,tp:37400,trx:96,produk:"Kopi Arabica Gayo"},tahun:{omzet:184000000,tp:368000,trx:1120,produk:"Kopi Arabica Gayo"}};
  const d=data[period];
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>📊 Laporan Penjualan</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[["minggu","Mingguan"],["bulan","Bulanan"],["tahun","Tahunan"]].map(([k,l])=><Chip key={k} active={period===k} onClick={()=>setPeriod(k)}>{l}</Chip>)}
        </div>
        <Card style={{background:C.greenGrad,marginBottom:12}}>
          <div style={{color:"rgba(255,255,255,0.85)",fontSize:12}}>Total Omzet</div>
          <div style={{color:C.white,fontSize:28,fontWeight:900}}>Rp {fmt(d.omzet)}</div>
          <div style={{color:C.gold,fontSize:13,fontWeight:700,marginTop:2}}>= {fmtTP(d.tp)}</div>
        </Card>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <Card style={{flex:1,textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:C.blue}}>{d.trx}</div><div style={{fontSize:11,color:C.grayMid}}>Transaksi</div></Card>
          <Card style={{flex:1,textAlign:"center"}}><div style={{fontSize:13,fontWeight:800,color:C.dark}}>{d.produk}</div><div style={{fontSize:11,color:C.grayMid}}>Produk Terlaris</div></Card>
        </div>
        <Card>
          <div style={{fontWeight:700,marginBottom:10}}>📈 Tren Penjualan</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:100}}>
            {[40,65,50,80,60,90,75].map((h,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:"100%",height:h,background:C.greenGrad,borderRadius:"4px 4px 0 0"}}/>
                <span style={{fontSize:9,color:C.grayMid}}>{["S","S","R","K","J","S","M"][i]}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{marginTop:12}}>
          <div style={{fontWeight:700,marginBottom:10}}>🏆 Produk Terlaris</div>
          {PRODS.slice(0,3).map((p,i)=>(
            <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${C.grayLight}`:"none"}}>
              <span style={{fontSize:18,fontWeight:900,color:C.grayMid,width:20}}>#{i+1}</span>
              <span style={{fontSize:20}}>{p.em}</span>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700}}>{p.name}</div><div style={{fontSize:10,color:C.grayMid}}>{p.sold} terjual</div></div>
              <div style={{fontSize:12,fontWeight:800,color:C.green}}>Rp {fmt(p.price*p.sold/10)}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// REKENING BANK
// ═══════════════════════════════════════════════
const BankAccountScreen=({onBack})=>{
  const [banks]=useState([
    {bank:"BRI",no:"0123-01-456789-50-1",name:"Budi Santoso",main:true},
    {bank:"BNI",no:"0987654321",name:"Budi Santoso",main:false},
  ]);
  const [showAdd,setShowAdd]=useState(false);
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>🏦 Rekening Bank</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{fontSize:12,color:C.grayMid,marginBottom:12}}>Rekening untuk menarik saldo TALPAY ke uang tunai</div>
        {banks.map((b,i)=>(
          <Card key={i} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{width:44,height:44,background:C.bluePale,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:C.blue}}>🏦</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>Bank {b.bank}</div>
                  <div style={{fontSize:12,color:C.grayMid}}>{b.no}</div>
                  <div style={{fontSize:11,color:C.grayMid}}>a.n. {b.name}</div>
                </div>
              </div>
              {b.main&&<Badge color={C.green}>Utama</Badge>}
            </div>
          </Card>
        ))}
        {!showAdd?(
          <Btn full v="outline" onClick={()=>setShowAdd(true)}>+ Tambah Rekening Baru</Btn>
        ):(
          <Card>
            <div style={{fontWeight:700,marginBottom:10}}>Tambah Rekening</div>
            <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Pilih Bank</div>
              <select style={{width:"100%",padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.grayLight}`,fontSize:14,background:C.white,fontFamily:"inherit"}}>
                {["BRI","BNI","Mandiri","BSI","BCA","CIMB Niaga"].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Nomor Rekening</div><Inp ph="cth: 0123456789" icon="🔢"/></div>
            <div style={{marginBottom:14}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Nama Pemilik Rekening</div><Inp ph="Sesuai buku tabungan" icon="👤"/></div>
            <div style={{display:"flex",gap:8}}>
              <Btn v="ghost" style={{flex:1}} onClick={()=>setShowAdd(false)}>Batal</Btn>
              <Btn v="primary" style={{flex:1}} onClick={()=>setShowAdd(false)}>Simpan</Btn>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// ALAMAT PENGIRIMAN
// ═══════════════════════════════════════════════
const AddressScreen=({onBack})=>{
  const [addrs]=useState([
    {label:"Rumah",addr:"Jl. Merdeka No. 45, Klaten Tengah, Klaten, Jawa Tengah 57411",main:true},
    {label:"Gudang Tani",addr:"Jl. Raya Pertanian No. 12, Klaten Selatan, Jawa Tengah 57425",main:false},
  ]);
  const [showAdd,setShowAdd]=useState(false);
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>📍 Alamat Pengiriman</div>
        </div>
      </div>
      <div style={{padding:16}}>
        {addrs.map((a,i)=>(
          <Card key={i} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div style={{fontWeight:700,fontSize:14}}>📍 {a.label}</div>
              {a.main&&<Badge color={C.green}>Utama</Badge>}
            </div>
            <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>{a.addr}</div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <Btn v="outline" sm style={{flex:1}} onClick={()=>alert(`Edit alamat: ${a.label}`)}>✏️ Edit</Btn>
              <Btn v="ghost" sm style={{flex:1}} onClick={()=>alert(`Hapus alamat: ${a.label}?`)}>🗑️ Hapus</Btn>
            </div>
          </Card>
        ))}
        {!showAdd?(
          <Btn full v="outline" onClick={()=>setShowAdd(true)}>+ Tambah Alamat Baru</Btn>
        ):(
          <Card>
            <div style={{fontWeight:700,marginBottom:10}}>Alamat Baru</div>
            <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Label Alamat</div><Inp ph="cth: Rumah, Kantor, Gudang" icon="🏷️"/></div>
            <div style={{marginBottom:10}}><div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>Alamat Lengkap</div>
              <textarea placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos" style={{width:"100%",padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.grayLight}`,fontSize:14,minHeight:70,resize:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn v="ghost" style={{flex:1}} onClick={()=>setShowAdd(false)}>Batal</Btn>
              <Btn v="primary" style={{flex:1}} onClick={()=>setShowAdd(false)}>Simpan</Btn>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// KEAMANAN AKUN
// ═══════════════════════════════════════════════
const SecurityScreen=({onBack})=>{
  const [pinOn,setPinOn]=useState(true);
  const [bioOn,setBioOn]=useState(true);
  const [twoFa,setTwoFa]=useState(false);
  const Toggle=({on,onClick})=>(
    <div onClick={onClick} style={{width:44,height:24,borderRadius:12,background:on?C.green:C.grayLight,cursor:"pointer",position:"relative",transition:"all 0.2s"}}>
      <div style={{width:18,height:18,borderRadius:9,background:C.white,position:"absolute",top:3,left:on?23:3,transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}}/>
    </div>
  );
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>🔒 Keamanan Akun</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <Card style={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0"}}>
            <div><div style={{fontWeight:700,fontSize:14}}>🔢 PIN TALPAY</div><div style={{fontSize:11,color:C.grayMid}}>Wajib saat transaksi TALPAY</div></div>
            <Toggle on={pinOn} onClick={()=>setPinOn(!pinOn)}/>
          </div>
          <Div/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0"}}>
            <div><div style={{fontWeight:700,fontSize:14}}>👆 Login Biometrik</div><div style={{fontSize:11,color:C.grayMid}}>Sidik jari / Face ID</div></div>
            <Toggle on={bioOn} onClick={()=>setBioOn(!bioOn)}/>
          </div>
          <Div/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0"}}>
            <div><div style={{fontWeight:700,fontSize:14}}>🛡️ Verifikasi 2 Langkah</div><div style={{fontSize:11,color:C.grayMid}}>OTP via SMS saat login perangkat baru</div></div>
            <Toggle on={twoFa} onClick={()=>setTwoFa(!twoFa)}/>
          </div>
        </Card>
        <Card style={{marginBottom:10,cursor:"pointer"}} onClick={()=>alert("Form ganti PIN TALPAY akan terbuka di sini")}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontWeight:700,fontSize:14}}>🔑 Ganti PIN TALPAY</div></div>
            <span style={{color:C.grayMid}}>›</span>
          </div>
        </Card>
        <Card style={{marginBottom:10,cursor:"pointer"}} onClick={()=>alert("Perangkat: iPhone 14 Pro · Jakarta · Login 19 Jun 2026")}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontWeight:700,fontSize:14}}>📱 Perangkat Aktif</div><div style={{fontSize:11,color:C.grayMid}}>1 perangkat sedang login</div></div>
            <span style={{color:C.grayMid}}>›</span>
          </div>
        </Card>
        <Card style={{background:C.greenPale}}>
          <div style={{fontSize:12,color:C.green,lineHeight:1.6}}>🔒 Data dan transaksimu dilindungi enkripsi tingkat bank. TALARA tidak pernah meminta PIN atau password melalui chat/telepon.</div>
        </Card>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// BANTUAN & FAQ
// ═══════════════════════════════════════════════
const HelpScreen=({onBack})=>{
  const [open,setOpen]=useState(null);
  const faqs=[
    {q:"Apa itu TALPAY?",a:"TALPAY adalah uang digital resmi TALARA. 1 TALPAY = Rp 500. Digunakan untuk bertransaksi di seluruh marketplace TALARA dengan aman dan tercatat."},
    {q:"Bagaimana cara topup TALPAY?",a:"Buka menu TALPAY > Topup, pilih nominal, lalu bayar via Transfer Bank, QRIS, Alfamart, atau Indomaret. Saldo masuk otomatis dalam hitungan detik."},
    {q:"Bagaimana cara jual produk di TALARA?",a:"Tekan tombol 📤 Jual di menu bawah, isi foto, nama produk, kategori, harga dan stok, lalu klik Upload. Produk akan ditinjau dalam 1x24 jam."},
    {q:"Apakah ada biaya untuk penjual?",a:"TALARA mengenakan komisi 3-5% per transaksi berhasil. Tidak ada biaya pendaftaran atau biaya bulanan."},
    {q:"Bagaimana cara menghubungi penjual?",a:"Buka halaman produk, tekan tombol 💬 Chat untuk mengobrol langsung dengan penjual sebelum atau sesudah membeli."},
    {q:"Berapa lama pengiriman produk?",a:"Tergantung jasa kirim yang dipilih, umumnya 1-4 hari kerja. Kamu bisa melacak status pesanan secara real-time di menu Pesanan."},
    {q:"Bagaimana cara menarik saldo TALPAY ke rekening?",a:"Buka TALPAY > Tarik, masukkan jumlah, pilih rekening tujuan. Proses pencairan 1-3 menit tanpa biaya admin."},
  ];
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <BackBtn onClick={onBack}/>
          <div style={{color:C.white,fontWeight:800,fontSize:17}}>❓ Bantuan & FAQ</div>
        </div>
      </div>
      <div style={{padding:16}}>
        <Card style={{marginBottom:14,background:C.blueGrad}}>
          <div style={{color:C.white,fontWeight:700,marginBottom:4}}>💬 Butuh bantuan langsung?</div>
          <div style={{color:"rgba(255,255,255,0.85)",fontSize:12,marginBottom:10}}>Tim Customer Service TALARA siap membantu 24/7</div>
          <Btn v="ghost" sm style={{background:C.white,color:C.blue}} onClick={()=>alert("Menghubungkan ke tim Customer Service TALARA...")}>Chat CS Sekarang</Btn>
        </Card>
        <div style={{fontWeight:800,fontSize:14,marginBottom:10}}>Pertanyaan Umum</div>
        {faqs.map((f,i)=>(
          <Card key={i} style={{marginBottom:8,cursor:"pointer"}} onClick={()=>setOpen(open===i?null:i)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:700,fontSize:13,flex:1}}>{f.q}</div>
              <span style={{fontSize:14,color:C.grayMid,transform:open===i?"rotate(180deg)":"none",transition:"transform 0.2s"}}>⌄</span>
            </div>
            {open===i&&<div style={{fontSize:12,color:C.mid,lineHeight:1.7,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.grayLight}`}}>{f.a}</div>}
          </Card>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// TENTANG TALARA
// ═══════════════════════════════════════════════
const AboutScreen=({onBack})=>(
  <div style={{paddingBottom:90}}>
    <div style={{background:C.greenGrad,padding:"16px 16px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <BackBtn onClick={onBack}/>
        <div style={{color:C.white,fontWeight:800,fontSize:17}}>ℹ️ Tentang TALARA</div>
      </div>
    </div>
    <div style={{padding:16}}>
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <Logo size={72}/>
        <div style={{fontWeight:900,fontSize:22,color:C.dark,marginTop:12}}>TALARA</div>
        <div style={{fontSize:11,color:C.grayMid,letterSpacing:1}}>FARM · PLANTATION · AQUACULTURE · FISHERY</div>
        <div style={{fontSize:12,color:C.green,fontWeight:700,marginTop:6}}>"From Nature To The World"</div>
      </div>
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:700,marginBottom:8}}>🎯 Misi Kami</div>
        <div style={{fontSize:13,color:C.mid,lineHeight:1.7}}>Menghubungkan petani, pekebun, dan nelayan Indonesia langsung dengan pembeli tanpa perantara, sehingga kesejahteraan pelaku usaha sektor primer meningkat — dengan teknologi yang adil dan mudah diakses semua kalangan.</div>
      </Card>
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:700,marginBottom:8}}>💰 Tentang TALPAY</div>
        <div style={{fontSize:13,color:C.mid,lineHeight:1.7}}>Uang digital resmi ekosistem TALARA dengan nilai tetap 1 TALPAY = Rp 500, dirancang agar transaksi petani dan nelayan tercatat rapi, aman, dan tidak mudah hilang seperti uang tunai.</div>
      </Card>
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:700,marginBottom:10}}>🎯 Target Tahun Pertama</div>
        <div style={{display:"flex",justifyContent:"space-around",textAlign:"center"}}>
          {[["50rb","Target Pengguna"],["3","Provinsi Pilot"],["Rp 300M","Target GMV"],["7","Sumber Revenue"]].map(([v,l])=>(
            <div key={l}><div style={{fontSize:15,fontWeight:900,color:C.green}}>{v}</div><div style={{fontSize:9,color:C.mid,marginTop:2}}>{l}</div></div>
          ))}
        </div>
        <div style={{fontSize:10,color:C.grayMid,marginTop:8,fontStyle:"italic"}}>*Proyeksi internal, belum mencerminkan data pengguna aktual</div>
      </Card>
      <Card>
        <div style={{fontWeight:700,marginBottom:8}}>📞 Hubungi Kami</div>
        <div style={{fontSize:13,color:C.mid,lineHeight:2}}>
          📧 hello@talara.id<br/>
          🌐 www.talara.id<br/>
          📍 Jakarta, Indonesia
        </div>
      </Card>
      <div style={{textAlign:"center",fontSize:11,color:C.grayMid,marginTop:16}}>TALARA v1.0.0 · © 2026 PT TALARA Nusantara Digital</div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════
// PROFIL
// ═══════════════════════════════════════════════
const ProfilScreen=({onNav,onBack})=>{
  const [editMode,setEditMode]=useState(false);
  const menus=[
    {icon:"💰",l:"TALPAY Wallet",a:()=>onNav("talpay")},
    {icon:"📦",l:"Produk Saya",a:()=>onNav("produk_saya")},
    {icon:"🛒",l:"Riwayat Pesanan",a:()=>onNav("orders")},
    {icon:"📊",l:"Laporan Penjualan",a:()=>onNav("laporan")},
    {icon:"🏦",l:"Rekening Bank",a:()=>onNav("rekening")},
    {icon:"📍",l:"Alamat Pengiriman",a:()=>onNav("alamat")},
    {icon:"🔔",l:"Pengaturan Notifikasi",a:()=>onNav("notif")},
    {icon:"🌤️",l:"Info Cuaca & Laut",a:()=>onNav("cuaca")},
    {icon:"📊",l:"Harga Komoditas",a:()=>onNav("info")},
    {icon:"🔒",l:"Keamanan Akun",a:()=>onNav("keamanan")},
    {icon:"❓",l:"Bantuan & FAQ",a:()=>onNav("bantuan")},
    {icon:"ℹ️",l:"Tentang TALARA",a:()=>onNav("tentang")},
  ];
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:C.greenGrad,padding:"20px 16px 40px",textAlign:"center"}}>
        <div style={{fontSize:60,marginBottom:10}}>👨‍🌾</div>
        <div style={{color:C.white,fontWeight:900,fontSize:20}}>Pak Budi Santoso</div>
        <div style={{color:"rgba(255,255,255,0.75)",fontSize:13,marginTop:4}}>📍 Klaten, Jawa Tengah</div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:10}}>
          <Badge color={C.gold}>🌾 Petani</Badge>
          <Badge color={C.white}>⭐ 4.9 Rating</Badge>
          <Badge color={C.teal}>✅ Terverifikasi</Badge>
        </div>
      </div>
      <div style={{padding:"0 16px",marginTop:-20}}>
        <Card style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-around",textAlign:"center"}}>
            {[["156","Terjual"],["4.9","Rating"],["2.500","TALPAY"],["12","Produk"]].map(([v,l])=>(
              <div key={l}><div style={{fontSize:18,fontWeight:900,color:C.green}}>{v}</div><div style={{fontSize:10,color:C.grayMid}}>{l}</div></div>
            ))}
          </div>
        </Card>
        <Card style={{marginBottom:14,background:C.greenPale}}>
          <div style={{fontWeight:700,marginBottom:8}}>💰 Saldo TALPAY</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:24,fontWeight:900,color:C.dark}}>2.500 TP</div><div style={{fontSize:11,color:C.grayMid}}>= Rp 1.250.000</div></div>
            <Btn v="gold" sm onClick={()=>onNav("talpay")}>Kelola</Btn>
          </div>
        </Card>
        {menus.map(m=>(
          <Card key={m.l} style={{marginBottom:8,cursor:"pointer",padding:"12px 16px"}} onClick={m.a}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontSize:22}}>{m.icon}</span>
                <span style={{fontSize:14,fontWeight:600,color:C.dark}}>{m.l}</span>
              </div>
              <span style={{color:C.grayMid,fontSize:18}}>›</span>
            </div>
          </Card>
        ))}
        <div style={{textAlign:"center",padding:"20px 0"}}>
          <Logo size={32}/>
          <div style={{fontSize:11,color:C.grayMid,marginTop:8}}>TALARA v1.0.0 · 2026</div>
          <div style={{fontSize:10,color:C.grayMid}}>Farm · Plantation · Aquaculture · Fishery</div>
          <div style={{fontSize:10,color:C.green,fontWeight:700,marginTop:2}}>From Nature To The World 🌍</div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// BOTTOM NAV
// ═══════════════════════════════════════════════
const BottomNav=({active,onChange,chatUnread,notifUnread})=>{
  const tabs=[
    {k:"home",em:"🏠",l:"Beranda"},
    {k:"market",em:"🛒",l:"Market"},
    {k:"jual",em:"📤",l:"Jual",fab:true},
    {k:"chat",em:"💬",l:"Chat"},
    {k:"profil",em:"👤",l:"Profil"},
  ];
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,maxWidth:480,margin:"0 auto",background:C.white,borderTop:`1px solid ${C.grayLight}`,display:"flex",zIndex:100,boxShadow:"0 -4px 20px rgba(0,0,0,0.08)"}}>
      {tabs.map(t=>(
        <button key={t.k} onClick={()=>onChange(t.k)} style={{flex:1,background:"none",border:"none",padding:t.fab?"0":"10px 4px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,position:"relative",fontFamily:"inherit"}}>
          {t.fab?(
            <div style={{width:52,height:52,background:C.greenGrad,borderRadius:26,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 4px 16px rgba(27,107,47,0.45)",marginTop:-18}}>📤</div>
          ):(
            <>
              <span style={{fontSize:22,lineHeight:1,position:"relative"}}>
                {t.em}
                {t.k==="chat"&&chatUnread>0&&<span style={{position:"absolute",top:-4,right:-6,background:C.danger,color:C.white,fontSize:8,borderRadius:10,padding:"1px 4px",fontWeight:800}}>{chatUnread}</span>}
                {t.k==="home"&&notifUnread>0&&<span style={{position:"absolute",top:-4,right:-6,background:C.danger,color:C.white,fontSize:8,borderRadius:10,padding:"1px 4px",fontWeight:800}}>{notifUnread}</span>}
              </span>
              <span style={{fontSize:9,fontWeight:active===t.k?800:500,color:active===t.k?C.green:C.grayMid}}>{t.l}</span>
              {active===t.k&&<div style={{width:20,height:3,background:C.green,borderRadius:2}}/>}
            </>
          )}
        </button>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function TalaraApp(){
  const [started,setStarted]=useState(false);
  const [screen,setScreen]=useState("home");
  const [nav,setNav]=useState("home");
  const [prevScreen,setPrev]=useState("home");
  const [product,setProduct]=useState(null);
  const [liveSession,setLiveSession]=useState(null);
  const [cart,setCart]=useState([]);
  const [chat,setChat]=useState(null);
  const [chats,setChats]=useState(CHATS_D);
  const [notifs,setNotifs]=useState(NOTIFS_D);
  const [toast,setToast]=useState({show:false,msg:""});
  const [chatStartId,setChatStartId]=useState(null);

  const showToast=(msg)=>{setToast({show:true,msg});setTimeout(()=>setToast({show:false,msg:""}),2000);};
  const go=(s,prev=screen)=>{setPrev(prev);setScreen(s);};
  const back=()=>setScreen(prevScreen);

  const addCart=(p,qty=1)=>{
    setCart(c=>{
      const ex=c.findIndex(i=>i.id===p.id);
      if(ex>=0){const u=[...c];u[ex].qty+=qty;return u;}
      return [...c,{...p,qty}];
    });
    showToast(`✅ ${p.name} ditambahkan ke keranjang`);
  };

  const updateChat=(chatId,patch)=>{
    setChats(cs=>{
      const updated=cs.map(c=>c.id===chatId?{...c,...patch}:c);
      // move the updated chat to the top (most recent activity first)
      const idx=updated.findIndex(c=>c.id===chatId);
      if(idx>0){
        const [moved]=updated.splice(idx,1);
        updated.unshift(moved);
      }
      return updated;
    });
    if(chat&&chat.id===chatId){
      setChat(c=>({...c,...patch}));
    }
  };

  // Keep latest screen/chat available inside the timer below without re-triggering the effect
  const screenRef=useRef(screen);
  const chatRef=useRef(chat);
  useEffect(()=>{screenRef.current=screen;},[screen]);
  useEffect(()=>{chatRef.current=chat;},[chat]);

  // Simulate a new inbound message arriving in the inbox — makes the demo feel alive
  useEffect(()=>{
    const incoming=[
      {sId:"s3",text:"Kabar baik! Kopi sudah siap dikemas, mau dikirim hari ini?"},
      {sId:"s5",text:"Tuna hari ini baru masuk 150kg, masih sangat segar 🐟"},
      {sId:"s4",text:"Udang ready stock, bisa langsung proses kalau jadi order"},
      {sId:"s1",text:"Gabah baru panen kemarin, kualitas premium pak/bu"},
    ];
    const timer=setTimeout(()=>{
      const pick=incoming[Math.floor(Math.random()*incoming.length)];
      const timeStr=new Date().toLocaleTimeString("id",{hour:"2-digit",minute:"2-digit"});
      setChats(cs=>{
        const target=cs.find(c=>c.sId===pick.sId);
        if(!target)return cs;
        const inRoom=screenRef.current==="chat_room"&&chatRef.current?.id===target.id;
        const newMsg={from:"them",text:pick.text,time:timeStr};
        const updatedMsgs=[...target.msgs,newMsg];
        const updated=cs.map(c=>c.id===target.id?{...c,msgs:updatedMsgs,lastMsg:pick.text,time:timeStr,unread:inRoom?0:c.unread+1}:c);
        const idx=updated.findIndex(c=>c.id===target.id);
        const [moved]=updated.splice(idx,1);
        updated.unshift(moved);
        if(inRoom){
          setChat(c=>c&&c.id===target.id?{...c,msgs:updatedMsgs,lastMsg:pick.text,time:timeStr}:c);
        }else{
          showToast(`💬 Pesan baru dari ${target.sName}`);
        }
        return updated;
      });
    },22000);
    return()=>clearTimeout(timer);
  },[]);

  const handleNav=(tab)=>{
    setNav(tab);
    if(tab==="home"){setScreen("home");}
    else if(tab==="market"){go("market");}
    else if(tab==="jual"){go("jual");}
    else if(tab==="chat"){go("chat_list");}
    else if(tab==="profil"){go("profil");}
    else if(tab==="talpay"){go("talpay");}
    else if(tab==="notif"){go("notif");}
    else if(tab==="cart"){go("cart");}
    else if(tab==="orders"){go("orders");}
    else if(tab==="live_list"){go("live_list");}
    else if(tab==="info"){go("info_harga");}
    else if(tab==="cuaca"){go("cuaca");}
    else if(tab==="produk_saya"){go("produk_saya");}
    else if(tab==="laporan"){go("laporan");}
    else if(tab==="rekening"){go("rekening");}
    else if(tab==="alamat"){go("alamat");}
    else if(tab==="keamanan"){go("keamanan");}
    else if(tab==="bantuan"){go("bantuan");}
    else if(tab==="tentang"){go("tentang");}
  };

  const notifUnread=notifs.filter(n=>!n.read).length;
  const chatUnread=chats.reduce((s,c)=>s+c.unread,0);

  const showNav=!["live_room","chat_room"].includes(screen);

  if(!started)return <Onboarding onDone={()=>setStarted(true)}/>;

  return(
    <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",background:C.gray,fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <style>{`*{box-sizing:border-box;} @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      <div style={{overflowY:"auto",minHeight:"100vh"}}>

        {screen==="home"&&<HomeScreen onNav={handleNav} cartCount={cart.length} onProduct={p=>{setProduct(p);go("product");}} onAddCart={addCart} onLive={ls=>{setLiveSession(ls);go("live_room");}} notifCount={notifUnread}/>}

        {screen==="market"&&<MarketScreen onProduct={p=>{setProduct(p);go("product","market");}} onAddCart={addCart} onBack={back}/>}

        {screen==="product"&&<ProductDetail product={product} onBack={back} onAddCart={addCart}
          onBuy={(p,q)=>{addCart(p,q);go("cart");}}
          onStartChat={sId=>{
            const c=chats.find(c=>c.sId===sId)||chats[0];
            if(c.unread>0)updateChat(c.id,{unread:0});
            setChat(c);go("chat_room");
          }}/>}

        {screen==="cart"&&<CartScreen cart={cart} onBack={back} onRemove={i=>setCart(c=>c.filter((_,idx)=>idx!==i))} onCheckout={()=>{setCart([]);go("checkout");}}/>}

        {screen==="checkout"&&<CheckoutOK onHome={()=>{setScreen("home");setNav("home");}} onOrders={()=>go("orders")}/>}

        {screen==="live_list"&&<LiveList onLive={ls=>{setLiveSession(ls);go("live_room","live_list");}} onBack={back}/>}

        {screen==="live_room"&&<LiveRoom session={liveSession} onBack={back} onAddCart={addCart}/>}

        {screen==="chat_list"&&<ChatList chats={chats} onOpenChat={c=>{if(c.unread>0)updateChat(c.id,{unread:0});setChat(c);go("chat_room","chat_list");}} onBack={back}/>}

        {screen==="chat_room"&&<ChatRoom chat={chat} onBack={back} onUpdateChat={updateChat}/>}

        {screen==="talpay"&&<TalpayScreen onBack={back}/>}

        {screen==="jual"&&<JualScreen onBack={back}/>}

        {screen==="orders"&&<OrdersScreen onBack={back}/>}

        {screen==="notif"&&<NotifScreen onBack={back} notifs={notifs} onRead={()=>setNotifs(n=>n.map(x=>({...x,read:true})))}/>}

        {screen==="cuaca"&&<CuacaScreen onBack={back}/>}

        {screen==="info_harga"&&<InfoHarga onBack={back}/>}

        {screen==="produk_saya"&&<MyProductsScreen onBack={back}/>}

        {screen==="laporan"&&<SalesReportScreen onBack={back}/>}

        {screen==="rekening"&&<BankAccountScreen onBack={back}/>}

        {screen==="alamat"&&<AddressScreen onBack={back}/>}

        {screen==="keamanan"&&<SecurityScreen onBack={back}/>}

        {screen==="bantuan"&&<HelpScreen onBack={back}/>}

        {screen==="tentang"&&<AboutScreen onBack={back}/>}

        {screen==="profil"&&<ProfilScreen onNav={handleNav} onBack={back}/>}

      </div>

      {showNav&&<BottomNav active={nav} onChange={handleNav} chatUnread={chatUnread} notifUnread={notifUnread}/>}
      <Toast msg={toast.msg} show={toast.show}/>
    </div>
  );
}
