package com.app.jobTS.sign.premum.repository;

import com.app.jobTS.sign.premum.model.OldPremium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OldPremiumRepository extends JpaRepository<OldPremium, Long> {


}
