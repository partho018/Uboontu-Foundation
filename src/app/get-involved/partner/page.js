'use client';

import { useState } from 'react';
import { Building2, CheckCircle2, Send } from 'lucide-react';

const row1 = [
  "68a091feeaa832d6e633b930_Logo_Goldman Sachs_mono.svg",
  "68db9056e42ba9fd6c172833_Logo_Clarity_mono.svg",
  "68dcdfc38248b93d8a3fe1ed_Logo_Esdiac_mono.svg",
  "68dcdff13a553e58f8303e64_Logo_Learndojo_mono.svg",
  "68dce04f1cc66d075bc201c7_Logo_Vocai_mono.svg",
  "68dce06d6d2fe778ba755c28_Logo_Plentypay_mono.svg",
  "68deba780a85b7d26245ce16_Logo_Aike_mono.svg",
  "69720678ee0f40386f6b4992_Logo_Fraus_mono.svg",
  "697b6e3416493b65e726d165_Logo_Coinpulse_ mono.svg",
  "6885ee08f5f493b2bb9e7f1e_Logo_medease_mono.svg",
  "6885ee4528e1e50ce73cec96_Logo_3asafeer_mono.svg",
  "6885ee66114ee66a929deac9_Logo_affine_mono.svg",
  "6885ee8c69e8f4233a577999_Logo_akijship_mono.svg",
  "6885ee9e7ebe3a3c0e3a331c_Logo_akij_mono.svg",
  "6885eeb809370b706fb8e60d_Logo_alpine_mono.svg",
  "6885eece6aa97547b732fdf2_Logo_axiata_mono.svg",
  "6885eee107ee412b3af204cf_Logo_Bizphix_mono.svg"
];

const row2 = [
  "6885eef1a76e2babd6efc174_Logo_Buttercup_mono.svg",
  "6885ef0413f8918ac5356de1_Logo_carbobon_mono.svg",
  "6885ef13617c539ba8a284f4_Logo_carnesia_mono.svg",
  "6885ef283a1bcb89be6747e7_Logo_compaies_mono.svg",
  "6885ef3df74b709059457346_Logo_cpg_mono.svg",
  "6885ef50dfdca9f9140b8bf1_Logo_crantech_mono.svg",
  "6885ef82c4a168e60b47911d_Logo_CRE Guard_mono.svg",
  "6885ef94ab9e4ca1123be230_Logo_Dlicio_mono.svg",
  "6885efa747ec9f1d1564f668_Logo_docuseal_mono.svg",
  "6885efb8de6485b41ef30512_Logo_edvive_mono.svg",
  "6885efcf7840077b72111115_Logo_farasha_mono.svg",
  "6885efde40d2b35d3d22dea0_Logo_fitmate_mono.svg",
  "6885effb87ea8f930b980cad_Logo_Gainsty_mono.svg",
  "6885f01211f8986a34f542d8_Logo_grow_mono.svg",
  "6885f03409370b706fb922c8_Logo_Guardian_mono.svg",
  "6885f045523f0b94ba432e42_Logo_heyluna_mono.svg",
  "6885f0546756b58458d71b9b_Logo_IPDC_mono.svg"
];

const row3 = [
  "6885f06558e5a5df0fbefdde_Logo_khanit_mono.svg",
  "6885f07d9c093fad609a26bb_Logo_klasio_mono.svg",
  "6885f091d389d8df99129c17_Logo_leklub_mono.svg",
  "6885f0a19297eaa439b36a54_Logo_lendiview_mono.svg",
  "6885f0c4d6d77ef939024a24_Logo_liberatelabs_mono.svg",
  "6885f0d458e5a5df0fbf1790_Logo_likely_mono.svg",
  "6885f0e8feb06d3d996d79c3_Logo_Memorybox_mono.svg",
  "6885f10530ade15b8f215893_Logo_onethread_mono.svg",
  "6885f12d87ea8f930b98389b_Logo_rabfy_mono.svg",
  "6885f13ec2ad5470f81a0156_Logo_ontik_mono.svg",
  "6885f14fe135439678c205c4_Logo_ostad_mono.svg",
  "6885f15d6e8226dcdd42841f_Logo_oter_mono.svg",
  "6885f16d40ff0915c93957cd_Logo_pepsi_mono.svg",
  "6885f17caf72390465b4e033_Logo_PF_mono.svg",
  "6885f18ddddd13f9898fa4a1_Logo_Sift_mono.svg",
  "6885f19c8b03c8659ce41c98_Logo_skillophy_mono.svg",
  "6885f1aadb3edb2617313123_Logo_telenor_mono.svg"
];

const row4 = [
  "6885f1b6efcab4b193f09f5c_Logo_tempo_mono.svg",
  "6885f1c594a1ec8ca506cd37_Logo_triply_mono.svg",
  "6885f1d2a43bb3fbe72ee40c_Logo_viber_mono.svg",
  "6885f1e4306e3894a1466064_Logo_ways_mono.svg",
  "6885f1f680fdbf02fa0eae57_Logo_Y Combinator_mono.svg",
  "6885f2004933c2b4d513d932_Logo_yenex_mono.svg",
  "6886538a81d84aaf47e5386d_Logo_Addisoft_mono.svg",
  "6886539e25b283ac0614549d_Logo_Banglashikhi_mono.svg",
  "688653afacecba76738e739f_Logo_Homerun_mono.svg",
  "688653bf4f47ca91cf09762b_Logo_Sitewise_mono.svg",
  "688656b4cb56ce5a1e817819_Logo_Relaxy_mono.svg",
  "68a091859ea0add1f56a3a99_Logo_zantrik_mono.svg",
  "68a091c01ddc2dc9b5c6004d_Logo_Backpack_mono.svg",
  "699edc572d2132bc29e673b6_Logo_Wefi_ mono.svg",
  "699edc87359d20b3995f03cc_Logo_FMS_ mono.svg",
  "69e8da7044354a424b483801_Logo_Salesgo_ mono.svg",
  "6a2a85c1739fe7aab067997f_Logo_Externalit_ mono.svg",
  "6a2a85e71b1908e75d278368_Logo_Goodgenes_ mono.svg"
];

const renderBrandLogo = (filename, index) => {
  if (!filename) return null;
  return (
    <div className="brand-item" key={index}>
      <img 
        src={`/img/Trusted by/${filename}`} 
        className="brand-logo-img" 
        alt="Brand Logo" 
        draggable={false}
      />
    </div>
  );
};

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipType: 'csr',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      orgName: '',
      contactName: '',
      email: '',
      phone: '',
      partnershipType: 'csr',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <main className="get-involved-page">
      {/* Content Section */}
      <section className="gi-split-section">
        <div className="container gi-split-container">
          <div className="gi-split-grid scroll-reveal reveal-fade-up">
            <div className="gi-split-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" 
                alt="Partner With Us - Organizational Collaboration" 
              />
            </div>
            <div className="gi-split-content">
              <span className="gi-eyebrow" style={{ alignSelf: 'flex-start' }}>
                <Building2 size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Partner
              </span>
              <h1 className="gi-split-title">Partner With <span className="elegant-serif">Us</span></h1>
              <p className="gi-split-subtitle">
                CSR collaborations, grants, and organizational partnerships to empower communities through effective Public-Private Partnerships (PPP).
              </p>
              <div className="gi-split-divider" />
              <p className="gi-split-desc-lead">
                Join hands with Uboontu Foundation in creating cleaner, greener, and more sustainable communities through impactful environmental action. We welcome CSR collaborations, grants, and organizational partnerships to empower communities through effective Public-Private Partnerships (PPP).
              </p>
              <p className="gi-split-desc-body">
                With strong on-ground experience in waste management, Uboontu Foundation works in alignment with government initiatives such as Swachh Bharat Mission and Mission LiFE, while promoting the principles of Reduce, Reuse, and Recycle (3R) and sustainable waste management practices. The foundation has valid 12A, 80G, and CSR-approval for corporate partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="trusted-brands-section">
        <div className="trusted-brands-container">
          <h2 className="trusted-brands-title">
            Trusted by 200+ of the world&apos;s top brands
          </h2>
          
          <div className="brands-marquee-wrapper">
            {/* Left and Right Fade Overlays for smooth mist transition */}
            <div className="marquee-fade-left"></div>
            <div className="marquee-fade-right"></div>

            <div className="brands-grid">
              {/* Row 1: Sliding Left */}
              <div className="brands-marquee-row row-left">
                <div className="brands-marquee-track">
                  {row1.map((logo, idx) => renderBrandLogo(logo, `r1-${idx}`))}
                  {row1.map((logo, idx) => renderBrandLogo(logo, `r1-dup-${idx}`))}
                </div>
              </div>

              {/* Row 2: Sliding Right */}
              <div className="brands-marquee-row row-right">
                <div className="brands-marquee-track">
                  {row2.map((logo, idx) => renderBrandLogo(logo, `r2-${idx}`))}
                  {row2.map((logo, idx) => renderBrandLogo(logo, `r2-dup-${idx}`))}
                </div>
              </div>

              {/* Row 3: Sliding Left */}
              <div className="brands-marquee-row row-left">
                <div className="brands-marquee-track">
                  {row3.map((logo, idx) => renderBrandLogo(logo, `r3-${idx}`))}
                  {row3.map((logo, idx) => renderBrandLogo(logo, `r3-dup-${idx}`))}
                </div>
              </div>

              {/* Row 4: Sliding Right */}
              <div className="brands-marquee-row row-right">
                <div className="brands-marquee-track">
                  {row4.map((logo, idx) => renderBrandLogo(logo, `r4-${idx}`))}
                  {row4.map((logo, idx) => renderBrandLogo(logo, `r4-dup-${idx}`))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="gi-form-section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="gi-form-container scroll-reveal reveal-fade-up">
            {!submitted ? (
              <>
                <div className="gi-form-header">
                  <h2>Partnership <span className="elegant-serif">Inquiry</span></h2>
                  <p>Partner with Uboontu Foundation to drive sustainable change.</p>
                </div>
                
                <form className="gi-form" onSubmit={handleSubmit}>
                  <div className="gi-form-row">
                    <div className="gi-form-group">
                      <label htmlFor="orgName">Organization / Company Name</label>
                      <input 
                        type="text" 
                        id="orgName" 
                        name="orgName" 
                        required 
                        value={formData.orgName} 
                        onChange={handleChange}
                        className="gi-input" 
                        placeholder="Company name"
                      />
                    </div>
                    <div className="gi-form-group">
                      <label htmlFor="contactName">Contact Person Name</label>
                      <input 
                        type="text" 
                        id="contactName" 
                        name="contactName" 
                        required 
                        value={formData.contactName} 
                        onChange={handleChange}
                        className="gi-input" 
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="gi-form-row">
                    <div className="gi-form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange}
                        className="gi-input" 
                        placeholder="name@company.com"
                      />
                    </div>
                    <div className="gi-form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange}
                        className="gi-input" 
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="partnershipType">Partnership Category</label>
                    <select 
                      id="partnershipType" 
                      name="partnershipType" 
                      value={formData.partnershipType} 
                      onChange={handleChange}
                      className="gi-select"
                    >
                      <option value="csr">CSR Collaboration</option>
                      <option value="grant">Project Grant / Funding</option>
                      <option value="ppp">Public-Private Partnership (PPP)</option>
                      <option value="other">Other Collaboration</option>
                    </select>
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="message">Statement of Interest / Objectives</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={5} 
                      value={formData.message} 
                      onChange={handleChange}
                      className="gi-textarea" 
                      placeholder="Describe how your organization would like to partner with Uboontu..."
                    />
                  </div>

                  <button type="submit" className="gi-submit-btn">
                    Submit Inquiry <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="gi-success-state">
                <div className="gi-success-icon">
                  <CheckCircle2 size={40} />
                </div>
                <h3>Partnership Inquiry Received</h3>
                <p>
                  Thank you, <strong>{formData.contactName}</strong> from <strong>{formData.orgName}</strong>. We have received your partnership request and will reach out to you shortly to discuss collaboration opportunities.
                </p>
                <button className="gi-reset-btn" onClick={handleReset}>
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
