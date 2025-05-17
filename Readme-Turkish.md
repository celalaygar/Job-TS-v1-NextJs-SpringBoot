# İş Takip Sistemi

Bu proje, kullanıcıların projelerini yönetmelerine, görevler oluşturup atamalarına, sprintler planlamalarına ve ilerlemeyi Kanban panosu üzerinden takip etmelerine olanak tanıyan kapsamlı bir iş takip sistemidir.

![Proje Ekran Görüntüsü 1](link_to_screenshot_1.png)
![Proje Ekran Görüntüsü 2](link_to_screenshot_2.png)
*(Buraya proje arayüzünden ekran görüntüleri ekleyebilirsiniz.)*

## Özellikler

* **Kullanıcı Yönetimi:**
    * Kullanıcı oluşturma ve giriş yapma.
* **Proje Yönetimi:**
    * Proje oluşturma.
    * Projelere kullanıcı davet etme.
* **Görev Yönetimi:**
    * Proje içinde görev oluşturma.
    * Görevleri kullanıcılara atama.
    * Görevlere yorum ekleme.
* **Sprint Yönetimi:**
    * Sprint oluşturma.
    * Sprintleri inceleme (içindeki görevler ve kullanıcılarla birlikte).
    * Sprintlere görev ekleme ve çıkarma.
    * Sprintlere kullanıcı ekleme ve çıkarma.
* **Backlog Yönetimi:**
    * Backlog ekranı.
    * Backloga görev ekleme.
    * Backlog'dan seçilen bir sprinte görev taşıma.
    * Sprintten başka bir sprinte veya backloga görev taşıma.
    * Backlog'dan görevi doğrudan bir sprinte atama.
* **Kanban Panosu:**
    * Görevlerin durumlarını görsel olarak takip etme.
* **Bildirim Yönetimi:**
    * Sistemdeki çeşitli olaylarla ilgili bildirimleri yönetme.

## Teknolojiler

Bu proje aşağıdaki teknolojiler kullanılarak geliştirilmiştir:

* **Frontend:**
    * [Next.js](https://nextjs.org/)
    * [Material UI](https://mui.com/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [TypeScript](https://www.typescriptlang.org/)
* **Backend:**
    * [Spring Boot](https://spring.io/projects/spring-boot)
    * [Spring Security](https://spring.io/projects/spring-security)
    * [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
    * [PostgreSQL](https://www.postgresql.org/)
    * [Hibernate](https://hibernate.org/)
    * [JPA (Java Persistence API)](https://jakarta.ee/specifications/persistence/)

## Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### Backend Kurulumu

1.  PostgreSQL'i kurun ve çalıştırın.
2.  `application.properties` veya `application.yml` dosyasında veritabanı bağlantı ayarlarını yapılandırın.
3.  Backend uygulamasını çalıştırmak için terminalde proje dizinine gidin ve aşağıdaki komutu çalıştırın:
    ```bash
    ./mvnw spring-boot:run
    ```
    veya
    ```bash
    ./gradlew bootRun
    ```

### Frontend Kurulumu

1.  Frontend proje dizinine gidin:
    ```bash
    cd frontend
    ```
2.  Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install
    # veya
    yarn install
    # veya
    pnpm install
    ```
3.  Uygulamayı geliştirme modunda başlatın:
    ```bash
    npm run dev
    # veya
    yarn dev
    # veya
    pnpm dev
    ```
    Frontend uygulaması genellikle `http://localhost:3000` adresinde çalışacaktır.

## Kullanım

Uygulamayı çalıştırdıktan sonra, bir tarayıcı üzerinden erişebilir ve yeni bir hesap oluşturarak veya mevcut bir hesapla giriş yaparak kullanmaya başlayabilirsiniz. Ardından projeler oluşturabilir, ekip üyelerini davet edebilir ve iş akışınızı yönetmeye başlayabilirsiniz.

## Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz, lütfen bir "pull request" gönderin veya bir "issue" oluşturarak önerilerinizi ve bulduğunuz hataları bildirin.

## Lisans

\[Lisans Adı Buraya] altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

---

Umarım bu `README.md` dosyası işinize yarar! GitHub repozitorinize bu içeriği ekleyerek projenizi daha iyi tanıtabilirsiniz. Eklemek istediğiniz başka bölümler veya detaylar olursa lütfen belirtin, yardımcı olmaktan memnuniyet duyarım. Ayrıca, ekran görüntüleri için yer tutucular bıraktım, projenizin arayüzünden birkaç görsel eklemeyi unutmayın.
