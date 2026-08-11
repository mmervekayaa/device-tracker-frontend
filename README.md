# Device Tracker Frontend

Basit bir cihaz/sensör okuma takip uygulaması. React + Vite ile yazıldı, GitHub Pages üzerinde yayınlanıyor ve .NET backend API'sine bağlanıyor.

## Canlı Bağlantılar

- **Frontend (GitHub Pages):** https://mmervekayaa.github.io/device-tracker-frontend/
- **Backend API (Render):** https://device-tracker-backend-kuu5.onrender.com/api

## Önemli Notlar

**Render cold start:** Backend, ücretsiz Render planında barındırılıyor. 15 dakika istek almazsa uykuya geçer; uyandıktan sonra ilk istek ~1 dakika sürebilir. Sayfadaki "🔄 Yenile" butonuyla backend'i uyandırabilirsiniz.

**Veri kalıcılığı yok:** Backend, veriyi in-memory (bellekte) tutar. Backend yeniden başladığında (uyku sonrası veya yeni deploy'da) tüm veriler sıfırlanır. Bu beklenen bir davranıştır, hata değildir.

## Yerel Geliştirme

```bash
git clone https://github.com/mmervekayaa/device-tracker-frontend.git
cd device-tracker-frontend
npm install
npm run dev
```

`.env.example` dosyasını `.env` olarak kopyalayıp backend URL'ini girin.

## Teknolojiler

- React + Vite
- Axios
- GitHub Actions (build + GitHub Pages deploy)