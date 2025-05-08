package com.app.jobTS.sign.premum.repository;

import com.app.jobTS.sign.premum.model.Premium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PremiumRepository extends JpaRepository<Premium, Long> {


}
