import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCAL_IMG = "/mnt/data/b1a74e76-92a2-40b1-a1ea-d447891afeeb.png";

const tiles = [
  { id:'hostel', title:'Hostel', src:'https://picsum.photos/seed/hostel/1200/800' },
  { id:'library', title:'Library', src:'https://picsum.photos/seed/library/1200/800' },
  { id:'sports', title:'Sports', src:'https://picsum.photos/seed/sports/1200/800' },
  { id:'fests', title:'Fests', src:'https://picsum.photos/seed/fests/1200/800' },
  { id:'campus', title:'Campus', src:LOCAL_IMG }
];

export default function CampusLife(){
  const [openFAQ, setOpenFAQ] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(null);

  const openModal = (t)=> {
    setActive(t);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = useCallback(()=> {
    setModalOpen(false);
    setActive(null);
    document.body.style.overflow = '';
  },[]);

  useEffect(()=> {
    const onKey = (e)=> { if(e.key==='Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[closeModal]);

  const faqs = [
    {q:'Does the college have hostels?', a:'Yes — well-maintained hostels with WiFi & mess.'},
    {q:'Are sports available?', a:'Multiple outdoor & indoor courts and a gym.'},
    {q:'What about fests?', a:'Annual tech & cultural fests with large participation.'}
  ];

  return (
    <div className="card">
      <h2>Campus Life</h2>

      <motion.div className="campus-grid" initial="hidden" whileInView="show" viewport={{once:true}}>
        {tiles.map((t, i)=>(
          <motion.div key={t.id} className="campus-tile" whileHover={{scale:1.03}} onClick={()=> openModal(t)} tabIndex={0} role="button" onKeyDown={(e)=> e.key==='Enter' && openModal(t)}>
            <div style={{width:'100%', height:'100%'}}>
              <img src={t.src} alt={t.title} className="tile-img" loading="lazy" />
              <div className="tile-overlay">
                <div className="tile-title">{t.title}</div>
                <div className="tile-sub">Click to enlarge</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="campus-faq">
        <h3 style={{marginTop:16}}>FAQ</h3>
        {faqs.map((f,i)=>(
          <div key={i} style={{marginTop:8}}>
            <div className="faq-question" onClick={()=> setOpenFAQ(openFAQ===i? null : i)} role="button" tabIndex={0} onKeyDown={(e)=> e.key==='Enter' && setOpenFAQ(openFAQ===i? null : i)}>
              <strong>{f.q}</strong>
              <span className={`faq-toggle ${openFAQ===i? 'open': ''}`}>▸</span>
            </div>
            <AnimatePresence initial={false}>
              {openFAQ===i && (
                <motion.div className="faq-answer" initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} transition={{duration:0.22}}>
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && active && (
          <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={closeModal}>
            <motion.div className="modal-content" initial={{scale:0.96, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.96, opacity:0}} onClick={(e)=> e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
              <img src={active.src} alt={active.title} className="modal-image" />
              <div className="modal-caption" style={{padding:'12px 18px'}}><strong>{active.title}</strong><div style={{color:'#436b82', marginTop:6}}>Click outside or press ESC to close</div></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
