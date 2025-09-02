package com.example.dashboard.mapper;

import com.example.dashboard.entity.Institution;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InstitutionMapper {
    
    @Select("SELECT * FROM institutions")
    List<Institution> findAll();
    
    @Select("SELECT * FROM institutions WHERE institution_name = #{institutionName}")
    Institution findByInstitutionName(String institutionName);
}
