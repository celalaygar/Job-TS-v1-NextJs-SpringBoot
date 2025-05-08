package com.app.jobTS.sign.premum.service;

import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.auth.repository.UserRepository;
import com.app.jobTS.sign.premum.dto.PremiumDto;
import com.app.jobTS.sign.premum.exception.UserNotFoundException;
import com.app.jobTS.sign.premum.model.OldPremium;
import com.app.jobTS.sign.premum.model.Premium;
import com.app.jobTS.sign.premum.model.PremiumType;
import com.app.jobTS.sign.premum.repository.OldPremiumRepository;
import com.app.jobTS.sign.premum.repository.PremiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class PremiumService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PremiumRepository premiumRepository;
    @Autowired
    private OldPremiumRepository oldPremiumRepository;


    public PremiumDto getPremiumByUserId(Long userId) throws  Exception{

        Optional<User> opt = userRepository.findById(userId);
        if(opt.isEmpty()){
            throw new UserNotFoundException("User not found");
        }
        return new PremiumDto(opt.get().getPremium());

    }
    public UserDto createStandartPremium(Long userId) throws  Exception{
        Premium premium = new Premium();
        Optional<User> opt = userRepository.findById(userId);
        if(opt.isEmpty()){
            throw new UserNotFoundException("User not found");
        }
        User user = opt.get();
        if(user.getPremium() != null){
            Premium deletedPremium = user.getPremium();

            OldPremium oldPremium = new OldPremium(deletedPremium);
            oldPremiumRepository.save(oldPremium);

            deletedPremium.setUser(null);
            premiumRepository.delete(deletedPremium);
        }
        calculateEndDateForPremium(premium);
        premium.setPremiumType(PremiumType.STANDART);
        premium.setUser(user);
        premiumRepository.save(premium);

        user.setPremium(premium);
        userRepository.save(user);


        return new UserDto(user);

    }


    private void calculateEndDateForPremium(Premium premium){
        Date currentDate = new Date(); // Mevcut tarih
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate); // Tarihi ayarla
        calendar.add(Calendar.MONTH, 1); // 1 ay ekle
        Date endDate = calendar.getTime(); // Son tarihi al
        premium.setStartDate(currentDate);
        premium.setEndDate(endDate);
    }
}
