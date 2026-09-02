exports.id=9428,exports.ids=[9428],exports.modules={78335:()=>{},96487:()=>{},99824:(a,b,c)=>{"use strict";c.d(b,{tR:()=>O,kg:()=>_,m0:()=>M,sr:()=>S,rV:()=>Y,w8:()=>z,xx:()=>H,bA:()=>w,hs:()=>D,Fb:()=>t,r$:()=>V,hG:()=>ab,WA:()=>J,t1:()=>K,g6:()=>I,Lf:()=>Q,ah:()=>N,l:()=>W,xM:()=>x,co:()=>F,JQ:()=>E,zP:()=>u,yI:()=>B,Z1:()=>A,mt:()=>p,nC:()=>r,Mm:()=>T,kl:()=>$,lo:()=>Z,Wh:()=>L,Cn:()=>P,Ti:()=>X,Se:()=>y,JU:()=>G,Rw:()=>v,LY:()=>C,tU:()=>s,rY:()=>U,kN:()=>R,Xx:()=>q,TK:()=>aa,$E:()=>ac});var d=c(34013),e=c(87550),f=c.n(e),g=c(33873),h=c.n(g),i=c(29021),j=c.n(i);let k=h().join(process.cwd(),"data"),l=h().join(k,"aymuhendislik.sqlite"),m=h().join(k,"db.json");j().existsSync(k)||j().mkdirSync(k,{recursive:!0});let n=null;function o(){return n||((n=new(f())(l)).pragma("journal_mode = WAL"),n.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id TEXT PRIMARY KEY,
      data_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_desc TEXT,
      description TEXT,
      icon TEXT,
      image TEXT,
      features_json TEXT,
      is_featured INTEGER DEFAULT 0,
      service_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT,
      location TEXT,
      completion_date TEXT,
      description TEXT,
      client TEXT,
      image TEXT,
      is_featured INTEGER DEFAULT 0,
      project_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      author TEXT,
      publish_date TEXT,
      read_time TEXT,
      cover_image TEXT,
      tags_json TEXT,
      is_published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service_type TEXT,
      building_type TEXT,
      square_meters TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT NOT NULL,
      is_read INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      client_name TEXT NOT NULL,
      company_or_building TEXT,
      rating INTEGER DEFAULT 5,
      comment TEXT NOT NULL,
      project_type TEXT,
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS sliders (
      id TEXT PRIMARY KEY,
      image TEXT NOT NULL,
      label TEXT,
      headline TEXT NOT NULL,
      sub TEXT,
      slide_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS references_table (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo TEXT NOT NULL,
      ref_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      filename TEXT NOT NULL,
      folder TEXT DEFAULT 'genel',
      size TEXT,
      mime_type TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS mails (
      id TEXT PRIMARY KEY,
      sender TEXT NOT NULL,
      sender_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      date TEXT NOT NULL,
      is_read INTEGER DEFAULT 1,
      folder TEXT DEFAULT 'sent',
      attachments_json TEXT
    );
  `),function(a){if(a.prepare("SELECT COUNT(*) as count FROM users").get().count>0)return;let b=null;if(j().existsSync(m))try{let a=j().readFileSync(m,"utf-8");b=JSON.parse(a)}catch(a){console.error("Could not parse json backup during seeding",a)}let c=d.Ay.hashSync("admin123",10),e=b?.adminUser||{id:"admin-1",username:"admin",name:"Ay M\xfchendislik Y\xf6netici",passwordHash:c,role:"admin",createdAt:new Date().toISOString().split("T")[0]};if(a.prepare(`
    INSERT OR REPLACE INTO users (id, username, name, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(e.id||"admin-1",e.username||"admin",e.name||"Ay M\xfchendislik Y\xf6netici",e.passwordHash||c,e.role||"admin",e.createdAt||new Date().toISOString().split("T")[0]),b?.settings&&a.prepare("INSERT OR REPLACE INTO settings (id, data_json) VALUES ('main', ?)").run(JSON.stringify(b.settings)),b?.services&&Array.isArray(b.services)){let c=a.prepare(`
      INSERT OR REPLACE INTO services (id, slug, title, short_desc, description, icon, image, features_json, is_featured, service_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);b.services.forEach((a,b)=>{c.run(a.id,a.slug,a.title,a.shortDesc||"",a.description||"",a.icon||"Wrench",a.image||"/images/1.png",JSON.stringify(a.features||[]),+!!a.isFeatured,a.order||b+1)})}if(b?.projects&&Array.isArray(b.projects)){let c=a.prepare(`
      INSERT OR REPLACE INTO projects (id, slug, title, category, location, completion_date, description, client, image, is_featured, project_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);b.projects.forEach((a,b)=>{c.run(a.id,a.slug,a.title,a.category||"",a.location||"",a.completionDate||"",a.description||"",a.client||"",a.image||"/images/1.png",+!!a.isFeatured,a.order||b+1)})}if(b?.blogPosts&&Array.isArray(b.blogPosts)){let c=a.prepare(`
      INSERT OR REPLACE INTO blog_posts (id, slug, title, excerpt, content, author, publish_date, read_time, cover_image, tags_json, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);b.blogPosts.forEach(a=>{c.run(a.id,a.slug,a.title,a.excerpt||"",a.content||"",a.author||"M\xfch. Serdar Ay",a.publishDate||"",a.readTime||"5 dk okuma",a.coverImage||"/images/2.png",JSON.stringify(a.tags||[]),+!!a.isPublished)})}if(b?.leads&&Array.isArray(b.leads)){let c=a.prepare(`
      INSERT OR REPLACE INTO leads (id, name, phone, email, service_type, building_type, square_meters, message, status, created_at, is_read)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);b.leads.forEach(a=>{c.run(a.id,a.name,a.phone,a.email||"",a.serviceType||"",a.buildingType||"",a.squareMeters||"",a.message||"",a.status||"new",a.createdAt||new Date().toISOString(),+!!a.isRead)})}if(b?.testimonials&&Array.isArray(b.testimonials)){let c=a.prepare(`
      INSERT OR REPLACE INTO testimonials (id, client_name, company_or_building, rating, comment, project_type, date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);b.testimonials.forEach(a=>{c.run(a.id,a.clientName,a.companyOrBuilding||"",a.rating||5,a.comment,a.projectType||"",a.date||"")})}if(b?.sliders&&Array.isArray(b.sliders)){let c=a.prepare(`
      INSERT OR REPLACE INTO sliders (id, image, label, headline, sub, slide_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);b.sliders.forEach((a,b)=>{c.run(a.id,a.image,a.label||"",a.headline,a.sub||"",a.order||b+1)})}if(b?.references&&Array.isArray(b.references)){let c=a.prepare(`
      INSERT OR REPLACE INTO references_table (id, name, logo, ref_order)
      VALUES (?, ?, ?, ?)
    `);b.references.forEach((a,b)=>{c.run(a.id,a.name,a.logo,a.order||b+1)})}if(b?.media&&Array.isArray(b.media)){let c=a.prepare(`
      INSERT OR REPLACE INTO media (id, title, url, filename, folder, size, mime_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);b.media.forEach(a=>{c.run(a.id,a.title,a.url,a.filename,a.folder||"genel",a.size||"",a.mimeType||"",a.createdAt||"")})}if(b?.mails&&Array.isArray(b.mails)){let c=a.prepare(`
      INSERT OR REPLACE INTO mails (id, sender, sender_email, subject, body, date, is_read, folder, attachments_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);b.mails.forEach(a=>{c.run(a.id,a.sender,a.senderEmail,a.subject,a.body,a.date,+!!a.isRead,a.folder,JSON.stringify(a.attachments||[]))})}}(n),function(a){if(0===a.prepare("SELECT COUNT(*) as count FROM media").get().count){let b=a.prepare(`
      INSERT OR REPLACE INTO media (id, title, url, filename, folder, size, mime_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);[{id:"med-1",title:"End\xfcstriyel Doğalgaz & RMS İstasyonu",url:"/images/1.png",filename:"1.png",folder:"slider",size:"340 KB",mimeType:"image/png",createdAt:"2026-08-20"},{id:"med-2",title:"Yetkili CAD Doğalgaz Proje \xc7izimi",url:"/images/2.png",filename:"2.png",folder:"slider",size:"420 KB",mimeType:"image/png",createdAt:"2026-08-20"},{id:"med-3",title:"Merkezi Kaskad Kazan Dairesi",url:"/images/3jpg.jpg",filename:"3jpg.jpg",folder:"hizmet",size:"280 KB",mimeType:"image/jpeg",createdAt:"2026-08-20"},{id:"med-4",title:"Bireysel Kombi ve Daire Tesisatı",url:"/images/4.jpg",filename:"4.jpg",folder:"slider",size:"310 KB",mimeType:"image/jpeg",createdAt:"2026-08-20"},{id:"med-5",title:"Radyant Fabrika & Kafe Isıtma",url:"/images/5.jpg",filename:"5.jpg",folder:"hizmet",size:"295 KB",mimeType:"image/jpeg",createdAt:"2026-08-20"},{id:"med-6",title:"Ay M\xfchendislik Kurumsal Logo (Tam)",url:"/logo/logo_tam.png",filename:"logo_tam.png",folder:"logo",size:"120 KB",mimeType:"image/png",createdAt:"2026-08-20"},{id:"med-7",title:"Ay M\xfchendislik İkon Logo",url:"/logo/logo_tek.png",filename:"logo_tek.png",folder:"logo",size:"85 KB",mimeType:"image/png",createdAt:"2026-08-20"},{id:"med-8",title:"Ağaoğlu İnşaat Referans Logo",url:"/images/referanslar/agaoglu_logo.svg",filename:"agaoglu_logo.svg",folder:"referans",size:"15 KB",mimeType:"image/svg+xml",createdAt:"2026-08-20"},{id:"med-9",title:"İGDAŞ Yetkili Firma Logo",url:"/images/referanslar/d.png",filename:"d.png",folder:"referans",size:"45 KB",mimeType:"image/png",createdAt:"2026-08-20"},{id:"med-10",title:"RAMS Global Referans Logo",url:"/images/referanslar/fsd.jpg",filename:"fsd.jpg",folder:"referans",size:"52 KB",mimeType:"image/jpeg",createdAt:"2026-08-20"},{id:"med-11",title:"Torunlar GYO Referans Logo",url:"/images/referanslar/images.jpg",filename:"images.jpg",folder:"referans",size:"48 KB",mimeType:"image/jpeg",createdAt:"2026-08-20"},{id:"med-12",title:"Nef İnşaat Referans Logo",url:"/images/referanslar/nef.png",filename:"nef.png",folder:"referans",size:"50 KB",mimeType:"image/png",createdAt:"2026-08-20"}].forEach(a=>{b.run(a.id,a.title,a.url,a.filename,a.folder,a.size,a.mimeType,a.createdAt)})}let b=h().join(process.cwd(),"public","uploads");if(j().existsSync(b)){let c=j().readdirSync(b),d=a.prepare("SELECT id FROM media WHERE filename = ? OR url = ?"),e=a.prepare(`
      INSERT INTO media (id, title, url, filename, folder, size, mime_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);for(let a of c){let c=`/uploads/${a}`;if(!d.get(a,c)){let d=h().join(b,a),f=j().statSync(d),g=h().extname(a).toLowerCase(),i="image/jpeg";".png"===g?i="image/png":".webp"===g?i="image/webp":".svg"===g?i="image/svg+xml":".gif"===g&&(i="image/gif"),e.run("med-up-"+Date.now()+"-"+Math.floor(1e3*Math.random()),a.replace(/\.[^/.]+$/,""),c,a,"genel",`${(f.size/1024).toFixed(1)} KB`,i,new Date(f.mtime).toISOString().split("T")[0])}}}}(n)),n}function p(){let a=o().prepare("SELECT data_json FROM settings WHERE id = 'main'").get();return a?JSON.parse(a.data_json):{companyName:"Ay M\xfchendislik",slogan:"End\xfcstriyel & Bireysel Doğalgaz M\xfchendislik \xc7\xf6z\xfcmleri",heroBadge:"EPDK & Gaz Dağıtım Yetkili M\xfchendislik Firması",heroTitle:"G\xfcvenli Enerji, Kusursuz Doğalgaz M\xfchendisliği",heroSubtitle:"T\xfcm T\xfcrkiye genelinde end\xfcstriyel tesisler, OSB fabrikaları, toplu konutlar ve ticari yapılar i\xe7in onaylı projelendirme, taahh\xfct ve anahtar teslim doğalgaz tesisat hizmetleri.",phone:"0 (216) 456 78 90",emergencyPhone:"0 (532) 999 88 77",whatsapp:"905329998877",email:"info@aymuhendislik.com.tr",address:"Tekstilkent Ticaret Merkezi G1 Blok No: 9 Esenler / İstanbul",city:"İstanbul (T\xfcm T\xfcrkiye)",workingHours:"Pzt - Cmt: 08:30 - 19:00 (7/24 Acil M\xfcdahale Hattı Aktif)",licenseNo:"EPDK-M\xdcH-2024-8842 / İGDAŞ YETKİ NO: 34-10492",aboutShort:"Ay M\xfchendislik; 16 yılı aşkın tecr\xfcbesi, yetkili uzman makine m\xfchendisleri ve mobil teknik kadrosuyla İstanbul Tekstilkent merkezli olarak T\xfcm T\xfcrkiye genelinde b\xfcy\xfck sanayi tesislerinden konutlara kadar her \xf6l\xe7ekte anahtar teslim doğalgaz m\xfchendisliği sunar.",aboutFull:"Ay M\xfchendislik olarak kurulduğumuz g\xfcnden bu yana doğalgazın g\xfcvenli, verimli ve yasal standartlara %100 uygun şekilde kullanılmasını sağlıyoruz. Merkezimiz İstanbul Esenler Tekstilkent'te bulunmakta olup T\xfcrkiye'nin 81 ilinde en prestijli sanayi kuruluşlarına, fabrikalarına, organize sanayi b\xf6lgelerine (OSB) ve binlerce konut/ticari yapıya m\xfchendislik taahh\xfct hizmeti verdik. T\xfcm s\xfcre\xe7lerimizde EPDK, TSE ve yerel gaz dağıtım şirketlerinin en katı g\xfcvenlik standartlarına uygun \xe7alışıyoruz. B\xfcy\xfck end\xfcstriyel fabrika d\xf6n\xfcş\xfcmlerinden bireysel projelere kadar anahtar teslim hizmet sunuyoruz.",yearsExperience:16,completedProjects:1450,happyClients:3200,certifiedStaff:24,googleMapsUrl:"https://maps.app.goo.gl/bpbn5Dzx6ezDK5mD9",facebookUrl:"https://facebook.com/aymuhendislik",instagramUrl:"https://instagram.com/aymuhendislik",linkedinUrl:"https://linkedin.com/company/aymuhendislik"}}function q(a){let b=o(),c={...p(),...a};return b.prepare("INSERT OR REPLACE INTO settings (id, data_json) VALUES ('main', ?)").run(JSON.stringify(c)),c}function r(){return o().prepare("SELECT * FROM sliders ORDER BY slide_order ASC").all().map(a=>({id:a.id,image:a.image,label:a.label,headline:a.headline,sub:a.sub,order:a.slide_order}))}function s(a){return o().prepare(`
    INSERT OR REPLACE INTO sliders (id, image, label, headline, sub, slide_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(a.id,a.image,a.label||"",a.headline,a.sub||"",a.order||1),a}function t(a){return o().prepare("DELETE FROM sliders WHERE id = ?").run(a).changes>0}function u(){return o().prepare("SELECT * FROM references_table ORDER BY ref_order ASC").all().map(a=>({id:a.id,name:a.name,logo:a.logo,order:a.ref_order}))}function v(a){return o().prepare(`
    INSERT OR REPLACE INTO references_table (id, name, logo, ref_order)
    VALUES (?, ?, ?, ?)
  `).run(a.id,a.name,a.logo,a.order||1),a}function w(a){return o().prepare("DELETE FROM references_table WHERE id = ?").run(a).changes>0}function x(){return o().prepare("SELECT * FROM media ORDER BY created_at DESC").all().map(a=>({id:a.id,title:a.title,url:a.url,filename:a.filename,folder:a.folder,size:a.size,mimeType:a.mime_type,createdAt:a.created_at}))}function y(a){return o().prepare(`
    INSERT OR REPLACE INTO media (id, title, url, filename, folder, size, mime_type, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(a.id,a.title,a.url,a.filename,a.folder||"genel",a.size||"",a.mimeType||"",a.createdAt||new Date().toISOString().split("T")[0]),a}function z(a){return o().prepare("DELETE FROM media WHERE id = ?").run(a).changes>0}function A(){return o().prepare("SELECT * FROM services ORDER BY service_order ASC").all().map(a=>({id:a.id,slug:a.slug,title:a.title,shortDesc:a.short_desc,description:a.description,icon:a.icon,image:a.image,features:JSON.parse(a.features_json||"[]"),isFeatured:1===a.is_featured,order:a.service_order}))}function B(a){let b=o().prepare("SELECT * FROM services WHERE slug = ?").get(a);if(b)return{id:b.id,slug:b.slug,title:b.title,shortDesc:b.short_desc,description:b.description,icon:b.icon,image:b.image,features:JSON.parse(b.features_json||"[]"),isFeatured:1===b.is_featured,order:b.service_order}}function C(a){return o().prepare(`
    INSERT OR REPLACE INTO services (id, slug, title, short_desc, description, icon, image, features_json, is_featured, service_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(a.id,a.slug,a.title,a.shortDesc||"",a.description||"",a.icon||"Wrench",a.image||"/images/1.png",JSON.stringify(a.features||[]),+!!a.isFeatured,a.order||1),a}function D(a){return o().prepare("DELETE FROM services WHERE id = ?").run(a).changes>0}function E(){return o().prepare("SELECT * FROM projects ORDER BY project_order ASC").all().map(a=>({id:a.id,slug:a.slug,title:a.title,category:a.category,location:a.location,completionDate:a.completion_date,description:a.description,client:a.client,image:a.image,isFeatured:1===a.is_featured,order:a.project_order}))}function F(a){let b=o().prepare("SELECT * FROM projects WHERE slug = ?").get(a);if(b)return{id:b.id,slug:b.slug,title:b.title,category:b.category,location:b.location,completionDate:b.completion_date,description:b.description,client:b.client,image:b.image,isFeatured:1===b.is_featured,order:b.project_order}}function G(a){return o().prepare(`
    INSERT OR REPLACE INTO projects (id, slug, title, category, location, completion_date, description, client, image, is_featured, project_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(a.id,a.slug,a.title,a.category||"",a.location||"",a.completionDate||"",a.description||"",a.client||"",a.image||"/images/1.png",+!!a.isFeatured,a.order||1),a}function H(a){return o().prepare("DELETE FROM projects WHERE id = ?").run(a).changes>0}function I(){return o().prepare("SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY publish_date DESC").all().map(a=>({id:a.id,slug:a.slug,title:a.title,excerpt:a.excerpt,content:a.content,author:a.author,publishDate:a.publish_date,readTime:a.read_time,coverImage:a.cover_image,tags:JSON.parse(a.tags_json||"[]"),isPublished:1===a.is_published}))}function J(){return o().prepare("SELECT * FROM blog_posts ORDER BY publish_date DESC").all().map(a=>({id:a.id,slug:a.slug,title:a.title,excerpt:a.excerpt,content:a.content,author:a.author,publishDate:a.publish_date,readTime:a.read_time,coverImage:a.cover_image,tags:JSON.parse(a.tags_json||"[]"),isPublished:1===a.is_published}))}function K(a){let b=o().prepare("SELECT * FROM blog_posts WHERE slug = ?").get(a);if(b)return{id:b.id,slug:b.slug,title:b.title,excerpt:b.excerpt,content:b.content,author:b.author,publishDate:b.publish_date,readTime:b.read_time,coverImage:b.cover_image,tags:JSON.parse(b.tags_json||"[]"),isPublished:1===b.is_published}}function L(a){return o().prepare(`
    INSERT OR REPLACE INTO blog_posts (id, slug, title, excerpt, content, author, publish_date, read_time, cover_image, tags_json, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(a.id,a.slug,a.title,a.excerpt||"",a.content||"",a.author||"M\xfch. Serdar Ay",a.publishDate||"",a.readTime||"5 dk okuma",a.coverImage||"/images/2.png",JSON.stringify(a.tags||[]),+!!a.isPublished),a}function M(a){return o().prepare("DELETE FROM blog_posts WHERE id = ?").run(a).changes>0}function N(){return o().prepare("SELECT * FROM leads ORDER BY created_at DESC").all().map(a=>({id:a.id,name:a.name,phone:a.phone,email:a.email,serviceType:a.service_type,buildingType:a.building_type,squareMeters:a.square_meters,message:a.message,status:a.status,createdAt:a.created_at,isRead:1===a.is_read}))}function O(a){let b=o(),c={...a,id:"lead-"+Date.now(),status:"new",createdAt:new Date().toISOString(),isRead:!1};return b.prepare(`
    INSERT INTO leads (id, name, phone, email, service_type, building_type, square_meters, message, status, created_at, is_read)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(c.id,c.name,c.phone,c.email||"",c.serviceType,c.buildingType||"",c.squareMeters||"",c.message||"",c.status,c.createdAt,0),c}function P(a){return o().prepare(`
    INSERT OR REPLACE INTO leads (id, name, phone, email, service_type, building_type, square_meters, message, status, created_at, is_read)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(a.id,a.name,a.phone,a.email||"",a.serviceType,a.buildingType||"",a.squareMeters||"",a.message||"",a.status,a.createdAt||new Date().toISOString(),+!!a.isRead),a}function Q(){let a=Z(),b=$(a[0]?.id||"admin-1")||{id:"admin-1",username:"admin",name:"Ay M\xfchendislik Y\xf6netici",passwordHash:"",role:"admin",createdAt:"2026-08-20"};return{settings:p(),services:A(),projects:E(),blogPosts:J(),leads:N(),testimonials:T(),sliders:r(),references:u(),media:x(),mails:W(),adminUser:b,adminUsers:a}}function R(a,b){return o().prepare("UPDATE leads SET status = ? WHERE id = ?").run(b,a).changes>0}function S(a){return o().prepare("DELETE FROM leads WHERE id = ?").run(a).changes>0}function T(){return o().prepare("SELECT * FROM testimonials ORDER BY date DESC").all().map(a=>({id:a.id,clientName:a.client_name,companyOrBuilding:a.company_or_building,rating:a.rating,comment:a.comment,projectType:a.project_type,date:a.date}))}function U(a){return o().prepare(`
    INSERT OR REPLACE INTO testimonials (id, client_name, company_or_building, rating, comment, project_type, date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(a.id,a.clientName,a.companyOrBuilding||"",a.rating||5,a.comment,a.projectType||"",a.date||""),a}function V(a){return o().prepare("DELETE FROM testimonials WHERE id = ?").run(a).changes>0}function W(){return o().prepare("SELECT * FROM mails ORDER BY date DESC").all().map(a=>({id:a.id,sender:a.sender,senderEmail:a.sender_email,subject:a.subject,body:a.body,date:a.date,isRead:1===a.is_read,folder:a.folder,attachments:JSON.parse(a.attachments_json||"[]")}))}function X(a){return o().prepare(`
    INSERT OR REPLACE INTO mails (id, sender, sender_email, subject, body, date, is_read, folder, attachments_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(a.id,a.sender,a.senderEmail,a.subject,a.body,a.date,+!!a.isRead,a.folder,JSON.stringify(a.attachments||[])),a}function Y(a){return o().prepare("DELETE FROM mails WHERE id = ?").run(a).changes>0}function Z(){return o().prepare("SELECT id, username, name, role, created_at FROM users ORDER BY created_at ASC").all().map(a=>({id:a.id,username:a.username,name:a.name,role:a.role||"admin",createdAt:a.created_at}))}function $(a){let b=o().prepare("SELECT * FROM users WHERE id = ?").get(a);return b?{id:b.id,username:b.username,name:b.name,passwordHash:b.password_hash,role:b.role||"admin",createdAt:b.created_at}:null}function _(a){let b=o(),c=d.Ay.genSaltSync(10),e=d.Ay.hashSync(a.passwordPlain,c),f="usr-"+Date.now(),g=new Date().toISOString().split("T")[0],h=a.role||"admin";return b.prepare(`
    INSERT INTO users (id, username, name, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(f,a.username.toLowerCase().trim(),a.name.trim(),e,h,g),{id:f,username:a.username.toLowerCase().trim(),name:a.name.trim(),passwordHash:e,role:h,createdAt:g}}function aa(a,b){let c=o(),e=$(a);if(!e)return!1;let f=b.username?b.username.toLowerCase().trim():e.username,g=b.name?b.name.trim():e.name,h=b.role||e.role||"admin",i=e.passwordHash;if(b.newPasswordPlain&&b.newPasswordPlain.trim().length>=6){let a=d.Ay.genSaltSync(10);i=d.Ay.hashSync(b.newPasswordPlain.trim(),a)}return c.prepare(`
    UPDATE users 
    SET username = ?, name = ?, role = ?, password_hash = ?
    WHERE id = ?
  `).run(f,g,h,i,a).changes>0}function ab(a){let b=o();return b.prepare("SELECT COUNT(*) as count FROM users").get().count<=1?{success:!1,error:"Sistemde en az bir y\xf6netici kalmalıdır."}:{success:b.prepare("DELETE FROM users WHERE id = ?").run(a).changes>0}}function ac(a,b){let c=o().prepare("SELECT * FROM users WHERE username = ?").get(a.toLowerCase().trim());return c&&d.Ay.compareSync(b,c.password_hash)?{id:c.id,username:c.username,name:c.name,passwordHash:c.password_hash,role:c.role||"admin",createdAt:c.created_at}:null}}};